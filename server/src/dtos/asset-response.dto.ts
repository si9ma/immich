import { ApiProperty } from '@nestjs/swagger';
import { Selectable } from 'kysely';
import { AssetFace, AssetFile, Exif, Stack, Tag, User } from 'src/database';
import { PropertyLifecycle } from 'src/decorators';
import { AuthDto } from 'src/dtos/auth.dto';
import { ExifResponseDto, mapExif } from 'src/dtos/exif.dto';
import {
  AssetFaceWithoutPersonResponseDto,
  PersonWithFacesResponseDto,
  mapFacesWithoutPerson,
  mapPerson,
} from 'src/dtos/person.dto';
import { TagResponseDto, mapTag } from 'src/dtos/tag.dto';
import { UserResponseDto, mapUser } from 'src/dtos/user.dto';
import { AssetStatus, AssetType, AssetVisibility } from 'src/enum';
import { hexOrBufferToBase64 } from 'src/utils/bytes';
import { mimeTypes } from 'src/utils/mime-types';

export class SanitizedAssetResponseDto {
  id!: string;
  @ApiProperty({ enumName: 'AssetTypeEnum', enum: AssetType })
  type!: AssetType;
  thumbhash!: string | null;
  originalMimeType?: string;
  localDateTime!: Date;
  duration!: string;
  livePhotoVideoId?: string | null;
  hasMetadata!: boolean;
}

export class AssetResponseDto extends SanitizedAssetResponseDto {
  deviceAssetId!: string;
  deviceId!: string;
  ownerId!: string;
  owner?: UserResponseDto;
  @PropertyLifecycle({ deprecatedAt: 'v1.106.0' })
  libraryId?: string | null;
  originalPath!: string;
  originalFileName!: string;
  fileCreatedAt!: Date;
  fileModifiedAt!: Date;
  updatedAt!: Date;
  isFavorite!: boolean;
  isArchived!: boolean;
  isTrashed!: boolean;
  isOffline!: boolean;
  @ApiProperty({ enum: AssetVisibility, enumName: 'AssetVisibility' })
  visibility!: AssetVisibility;
  exifInfo?: ExifResponseDto;
  tags?: TagResponseDto[];
  people?: PersonWithFacesResponseDto[];
  unassignedFaces?: AssetFaceWithoutPersonResponseDto[];
  /**base64 encoded sha1 hash */
  checksum!: string;
  stack?: AssetStackResponseDto | null;
  duplicateId?: string | null;

  @PropertyLifecycle({ deprecatedAt: 'v1.113.0' })
  resized?: boolean;
}

export type MapAsset = {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  id: string;
  updateId: string;
  status: AssetStatus;
  checksum: Buffer<ArrayBufferLike>;
  deviceAssetId: string;
  deviceId: string;
  duplicateId: string | null;
  duration: string | null;
  encodedVideoPath: string | null;
  exifInfo?: Selectable<Exif> | null;
  faces?: AssetFace[];
  fileCreatedAt: Date;
  fileModifiedAt: Date;
  files?: AssetFile[];
  isExternal: boolean;
  isFavorite: boolean;
  isOffline: boolean;
  visibility: AssetVisibility;
  libraryId: string | null;
  livePhotoVideoId: string | null;
  localDateTime: Date;
  originalFileName: string;
  originalPath: string;
  owner?: User | null;
  ownerId: string;
  sidecarPath: string | null;
  stack?: Stack | null;
  stackId: string | null;
  tags?: Tag[];
  thumbhash: Buffer<ArrayBufferLike> | null;
  type: AssetType;
};

export class AssetStackResponseDto {
  id!: string;

  primaryAssetId!: string;

  @ApiProperty({ type: 'integer' })
  assetCount!: number;
}

export type AssetMapOptions = {
  stripMetadata?: boolean;
  withStack?: boolean;
  auth?: AuthDto;
  exifAddressAsCity?: boolean;
};

// TODO: this is inefficient
const peopleWithFaces = (faces?: AssetFace[]): PersonWithFacesResponseDto[] => {
  const result: PersonWithFacesResponseDto[] = [];
  if (faces) {
    for (const face of faces) {
      if (face.person) {
        const existingPersonEntry = result.find((item) => item.id === face.person!.id);
        if (existingPersonEntry) {
          existingPersonEntry.faces.push(face);
        } else {
          result.push({ ...mapPerson(face.person!), faces: [mapFacesWithoutPerson(face)] });
        }
      }
    }
  }

  return result;
};

const mapStack = (entity: { stack?: Stack | null }) => {
  if (!entity.stack) {
    return null;
  }

  return {
    id: entity.stack.id,
    primaryAssetId: entity.stack.primaryAssetId,
    assetCount: entity.stack.assetCount ?? entity.stack.assets.length + 1,
  };
};

export function mapAsset(entity: MapAsset, options: AssetMapOptions = {}): AssetResponseDto {
  const { stripMetadata = false, withStack = false, exifAddressAsCity = true } = options;

  if (stripMetadata) {
    const sanitizedAssetResponse: SanitizedAssetResponseDto = {
      id: entity.id,
      type: entity.type,
      originalMimeType: mimeTypes.lookup(entity.originalFileName),
      thumbhash: entity.thumbhash ? hexOrBufferToBase64(entity.thumbhash) : null,
      localDateTime: entity.localDateTime,
      duration: entity.duration ?? '0:00:00.00000',
      livePhotoVideoId: entity.livePhotoVideoId,
      hasMetadata: false,
    };
    return sanitizedAssetResponse as AssetResponseDto;
  }

  return {
    id: entity.id,
    deviceAssetId: entity.deviceAssetId,
    ownerId: entity.ownerId,
    owner: entity.owner ? mapUser(entity.owner) : undefined,
    deviceId: entity.deviceId,
    libraryId: entity.libraryId,
    type: entity.type,
    originalPath: entity.originalPath,
    originalFileName: entity.originalFileName,
    originalMimeType: mimeTypes.lookup(entity.originalFileName),
    thumbhash: entity.thumbhash ? hexOrBufferToBase64(entity.thumbhash) : null,
    fileCreatedAt: entity.fileCreatedAt,
    fileModifiedAt: entity.fileModifiedAt,
    localDateTime: entity.localDateTime,
    updatedAt: entity.updatedAt,
    isFavorite: options.auth?.user.id === entity.ownerId ? entity.isFavorite : false,
    isArchived: entity.visibility === AssetVisibility.ARCHIVE,
    isTrashed: !!entity.deletedAt,
    visibility: entity.visibility,
    duration: entity.duration ?? '0:00:00.00000',
    exifInfo: entity.exifInfo ? mapExif(entity.exifInfo, exifAddressAsCity) : undefined,
    livePhotoVideoId: entity.livePhotoVideoId,
    tags: entity.tags?.map((tag) => mapTag(tag)),
    people: peopleWithFaces(entity.faces),
    unassignedFaces: entity.faces?.filter((face) => !face.person).map((a) => mapFacesWithoutPerson(a)),
    checksum: hexOrBufferToBase64(entity.checksum)!,
    stack: withStack ? mapStack(entity) : undefined,
    isOffline: entity.isOffline,
    hasMetadata: true,
    duplicateId: entity.duplicateId,
    resized: true,
  };
}
