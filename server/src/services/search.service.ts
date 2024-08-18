import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { SystemConfigCore } from 'src/cores/system-config.core';
import { AssetResponseDto, mapAsset } from 'src/dtos/asset-response.dto';
import { AuthDto } from 'src/dtos/auth.dto';
import { PersonResponseDto } from 'src/dtos/person.dto';
import {
  MetadataSearchDto,
  PlacesResponseDto,
  SearchPeopleDto,
  SearchPlacesDto,
  SearchResponseDto,
  SearchSuggestionRequestDto,
  SearchSuggestionType,
  SmartSearchDto,
  mapPlaces,
} from 'src/dtos/search.dto';
import { AssetEntity } from 'src/entities/asset.entity';
import { AssetOrder } from 'src/enum';
import { IAssetRepository } from 'src/interfaces/asset.interface';
import { ILoggerRepository } from 'src/interfaces/logger.interface';
import { IMachineLearningRepository } from 'src/interfaces/machine-learning.interface';
import { IMetadataRepository } from 'src/interfaces/metadata.interface';
import { IPartnerRepository } from 'src/interfaces/partner.interface';
import { IPersonRepository } from 'src/interfaces/person.interface';
import { ISearchRepository, SearchExploreItem } from 'src/interfaces/search.interface';
import { ISystemMetadataRepository } from 'src/interfaces/system-metadata.interface';
import { getMyPartnerIds } from 'src/utils/asset.util';
import { isSmartSearchEnabled } from 'src/utils/misc';

@Injectable()
export class SearchService {
  private configCore: SystemConfigCore;

  constructor(
    @Inject(ISystemMetadataRepository) systemMetadataRepository: ISystemMetadataRepository,
    @Inject(IMachineLearningRepository) private machineLearning: IMachineLearningRepository,
    @Inject(IPersonRepository) private personRepository: IPersonRepository,
    @Inject(ISearchRepository) private searchRepository: ISearchRepository,
    @Inject(IAssetRepository) private assetRepository: IAssetRepository,
    @Inject(IPartnerRepository) private partnerRepository: IPartnerRepository,
    @Inject(IMetadataRepository) private metadataRepository: IMetadataRepository,
    @Inject(ILoggerRepository) private logger: ILoggerRepository,
  ) {
    this.logger.setContext(SearchService.name);
    this.configCore = SystemConfigCore.create(systemMetadataRepository, logger);
  }

  async searchPerson(auth: AuthDto, dto: SearchPeopleDto): Promise<PersonResponseDto[]> {
    return this.personRepository.getByName(auth.user.id, dto.name, { withHidden: dto.withHidden });
  }

  async searchPlaces(dto: SearchPlacesDto): Promise<PlacesResponseDto[]> {
    const places = await this.searchRepository.searchPlaces(dto.name);
    return places.map((place) => mapPlaces(place));
  }

  async getExploreData(auth: AuthDto): Promise<SearchExploreItem<AssetResponseDto>[]> {
    const options = { maxFields: 12, minAssetsPerField: 5 };
    const results = await Promise.all([
      this.assetRepository.getAssetIdByCity(auth.user.id, options),
      this.assetRepository.getAssetIdByTag(auth.user.id, options),
    ]);
    const assetIds = new Set<string>(results.flatMap((field) => field.items.map((item) => item.data)));
    const assets = await this.assetRepository.getByIdsWithAllRelations([...assetIds]);
    const assetMap = new Map<string, AssetResponseDto>(assets.map((asset) => [asset.id, mapAsset(asset)]));

    return results.map(({ fieldName, items }) => ({
      fieldName,
      items: items.map(({ value, data }) => ({ value, data: assetMap.get(data) as AssetResponseDto })),
    }));
  }

  async searchMetadata(auth: AuthDto, dto: MetadataSearchDto): Promise<SearchResponseDto> {
    let checksum: Buffer | undefined;
    const userIds = await this.getUserIdsToSearch(auth);

    if (dto.checksum) {
      const encoding = dto.checksum.length === 28 ? 'base64' : 'hex';
      checksum = Buffer.from(dto.checksum, encoding);
    }

    const page = dto.page ?? 1;
    const size = dto.size || 250;
    const enumToOrder = { [AssetOrder.ASC]: 'ASC', [AssetOrder.DESC]: 'DESC' } as const;
    const { hasNextPage, items } = await this.searchRepository.searchMetadata(
      { page, size },
      {
        ...dto,
        checksum,
        userIds,
        orderDirection: dto.order ? enumToOrder[dto.order] : 'DESC',
      },
    );

    return this.mapResponse(items, hasNextPage ? (page + 1).toString() : null);
  }

  convertDateString(dateString: String) {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    const date = new Date(`${year}-${month}-${day}T00:00:00Z`);
    return date.toISOString();
  }

  async searchSmart(auth: AuthDto, dto: SmartSearchDto): Promise<SearchResponseDto> {
    const { machineLearning } = await this.configCore.getConfig({ withCache: false });
    if (!isSmartSearchEnabled(machineLearning)) {
      throw new BadRequestException('Smart search is not enabled');
    }

    const userIds = await this.getUserIdsToSearch(auth);

    const page = dto.page ?? 1;
    const size = dto.size || 250;

    // split dto.query to array by ~, then parse to date Array
    if (dto.query) {
      try {
        let checksum: Buffer | undefined;

        const dates = dto.query.split('-').map((date) => new Date(this.convertDateString(date)));
        if (dates.length > 0) {
          this.logger.log(`search by dates: ${dates}`);

          let searchByDateDto = Object.assign(new MetadataSearchDto(), dto);
          if (dates.length >= 2) {
            searchByDateDto.takenAfter = dates[0];
            searchByDateDto.takenBefore = dates[1];
          } else {
            searchByDateDto.takenAfter = dates[0];
            let takenBefore = new Date(dates[0].getTime());
            takenBefore.setDate(dates[0].getDate() + 1);
            searchByDateDto.takenBefore = takenBefore;
          }

          this.logger.log(`dto: ${JSON.stringify(searchByDateDto)}`);

          const { hasNextPage, items } = await this.searchRepository.searchMetadata(
            { page, size },
            {
              ...searchByDateDto,
              checksum,
              userIds,
              orderDirection: 'DESC',
            },
          );

          return this.mapResponse(items, hasNextPage ? (page + 1).toString() : null);
        }
      } catch (error) {
        this.logger.log(`Error parsing date: ${dto.query}`);
      }
    }

    const embedding = await this.machineLearning.encodeText(machineLearning.url, dto.query, machineLearning.clip);
    const { hasNextPage, items } = await this.searchRepository.searchSmart(
      { page, size },
      { ...dto, userIds, embedding },
    );

    return this.mapResponse(items, hasNextPage ? (page + 1).toString() : null);
  }

  async getAssetsByCity(auth: AuthDto): Promise<AssetResponseDto[]> {
    const userIds = await this.getUserIdsToSearch(auth);
    const assets = await this.searchRepository.getAssetsByCity(userIds);
    return assets.map((asset) => mapAsset(asset, { exifAddressAsCity: false }));
  }

  async getSearchSuggestions(auth: AuthDto, dto: SearchSuggestionRequestDto) {
    const results = await this.getSuggestions(auth.user.id, dto);
    return results.filter((result) => (dto.includeNull ? true : result !== null));
  }

  private getSuggestions(userId: string, dto: SearchSuggestionRequestDto) {
    switch (dto.type) {
      case SearchSuggestionType.COUNTRY: {
        return this.metadataRepository.getCountries(userId);
      }
      case SearchSuggestionType.STATE: {
        return this.metadataRepository.getStates(userId, dto.country);
      }
      case SearchSuggestionType.CITY: {
        return this.metadataRepository.getCities(userId, dto.country, dto.state);
      }
      case SearchSuggestionType.CAMERA_MAKE: {
        return this.metadataRepository.getCameraMakes(userId, dto.model);
      }
      case SearchSuggestionType.CAMERA_MODEL: {
        return this.metadataRepository.getCameraModels(userId, dto.make);
      }
      default: {
        return [];
      }
    }
  }

  private async getUserIdsToSearch(auth: AuthDto): Promise<string[]> {
    const partnerIds = await getMyPartnerIds({
      userId: auth.user.id,
      repository: this.partnerRepository,
      timelineEnabled: true,
    });
    return [auth.user.id, ...partnerIds];
  }

  private mapResponse(assets: AssetEntity[], nextPage: string | null): SearchResponseDto {
    return {
      albums: { total: 0, count: 0, items: [], facets: [] },
      assets: {
        total: assets.length,
        count: assets.length,
        items: assets.map((asset) => mapAsset(asset)),
        facets: [],
        nextPage,
      },
    };
  }
}
