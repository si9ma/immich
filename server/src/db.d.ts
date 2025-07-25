/**
 * This file was generated by kysely-codegen.
 * Please do not edit it manually.
 */

import type { ColumnType } from 'kysely';
import {
  AlbumUserRole,
  AssetFileType,
  AssetOrder,
  AssetStatus,
  AssetType,
  AssetVisibility,
  MemoryType,
  NotificationLevel,
  NotificationType,
  Permission,
  SharedLinkType,
  SourceType,
  SyncEntityType,
} from 'src/enum';
import { UserTable } from 'src/schema/tables/user.table';
import { OnThisDayData, UserMetadataItem } from 'src/types';

export type ArrayType<T> = ArrayTypeImpl<T> extends (infer U)[] ? U[] : ArrayTypeImpl<T>;

export type ArrayTypeImpl<T> = T extends ColumnType<infer S, infer I, infer U> ? ColumnType<S[], I[], U[]> : T[];

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U> ? ColumnType<S, I | undefined, U> : ColumnType<T, T | undefined, T>;

export type Int8 = ColumnType<number>;

export type Json = JsonValue;

export type JsonArray = JsonValue[];

export type JsonObject = {
  [x: string]: JsonValue | undefined;
};

export type JsonPrimitive = boolean | number | string | null;

export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Activity {
  albumId: string;
  assetId: string | null;
  comment: string | null;
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  isLiked: Generated<boolean>;
  updatedAt: Generated<Timestamp>;
  updateId: Generated<string>;
  userId: string;
}

export interface Albums {
  albumName: Generated<string>;
  /**
   * Asset ID to be used as thumbnail
   */
  albumThumbnailAssetId: string | null;
  createdAt: Generated<Timestamp>;
  deletedAt: Timestamp | null;
  description: Generated<string>;
  id: Generated<string>;
  isActivityEnabled: Generated<boolean>;
  order: Generated<AssetOrder>;
  ownerId: string;
  updatedAt: Generated<Timestamp>;
  updateId: Generated<string>;
}

export interface AlbumsAudit {
  deletedAt: Generated<Timestamp>;
  id: Generated<string>;
  albumId: string;
  userId: string;
}

export interface AlbumUsersAudit {
  deletedAt: Generated<Timestamp>;
  id: Generated<string>;
  albumId: string;
  userId: string;
}

export interface AlbumsAssetsAssets {
  albumsId: string;
  assetsId: string;
  createdAt: Generated<Timestamp>;
}

export interface AlbumsSharedUsersUsers {
  albumsId: string;
  role: Generated<AlbumUserRole>;
  usersId: string;
  updatedAt: Generated<Timestamp>;
  updateId: Generated<string>;
}

export interface ApiKeys {
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  key: string;
  name: string;
  permissions: Permission[];
  updatedAt: Generated<Timestamp>;
  updateId: Generated<string>;
  userId: string;
}

export interface AssetFaces {
  assetId: string;
  boundingBoxX1: Generated<number>;
  boundingBoxX2: Generated<number>;
  boundingBoxY1: Generated<number>;
  boundingBoxY2: Generated<number>;
  deletedAt: Timestamp | null;
  id: Generated<string>;
  imageHeight: Generated<number>;
  imageWidth: Generated<number>;
  personId: string | null;
  sourceType: Generated<SourceType>;
}

export interface AssetFiles {
  assetId: string;
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  path: string;
  type: AssetFileType;
  updatedAt: Generated<Timestamp>;
  updateId: Generated<string>;
}

export interface AssetJobStatus {
  assetId: string;
  duplicatesDetectedAt: Timestamp | null;
  facesRecognizedAt: Timestamp | null;
  metadataExtractedAt: Timestamp | null;
  previewAt: Timestamp | null;
  thumbnailAt: Timestamp | null;
}

export interface AssetsAudit {
  deletedAt: Generated<Timestamp>;
  id: Generated<string>;
  assetId: string;
  ownerId: string;
}

export interface Assets {
  checksum: Buffer;
  createdAt: Generated<Timestamp>;
  deletedAt: Timestamp | null;
  deviceAssetId: string;
  deviceId: string;
  duplicateId: string | null;
  duration: string | null;
  encodedVideoPath: Generated<string | null>;
  fileCreatedAt: Timestamp;
  fileModifiedAt: Timestamp;
  id: Generated<string>;
  isExternal: Generated<boolean>;
  isFavorite: Generated<boolean>;
  isOffline: Generated<boolean>;
  visibility: Generated<AssetVisibility>;
  libraryId: string | null;
  livePhotoVideoId: string | null;
  localDateTime: Timestamp;
  originalFileName: string;
  originalPath: string;
  ownerId: string;
  sidecarPath: string | null;
  stackId: string | null;
  status: Generated<AssetStatus>;
  thumbhash: Buffer | null;
  type: AssetType;
  updatedAt: Generated<Timestamp>;
  updateId: Generated<string>;
}

export interface AssetStack {
  id: Generated<string>;
  ownerId: string;
  primaryAssetId: string;
}

export interface Audit {
  action: string;
  createdAt: Generated<Timestamp>;
  entityId: string;
  entityType: string;
  id: Generated<number>;
  ownerId: string;
}

export interface Exif {
  assetId: string;
  updateId: Generated<string>;
  updatedAt: Generated<Timestamp>;
  autoStackId: string | null;
  bitsPerSample: number | null;
  city: string | null;
  colorspace: string | null;
  country: string | null;
  dateTimeOriginal: Timestamp | null;
  description: Generated<string>;
  exifImageHeight: number | null;
  exifImageWidth: number | null;
  exposureTime: string | null;
  fileSizeInByte: Int8 | null;
  fNumber: number | null;
  focalLength: number | null;
  fps: number | null;
  iso: number | null;
  latitude: number | null;
  lensModel: string | null;
  livePhotoCID: string | null;
  longitude: number | null;
  make: string | null;
  model: string | null;
  modifyDate: Timestamp | null;
  orientation: string | null;
  profileDescription: string | null;
  projectionType: string | null;
  rating: number | null;
  state: string | null;
  timeZone: string | null;
  district: string | null;
  address: string | null;
}

export interface FaceSearch {
  embedding: string;
  faceId: string;
}

export interface GeodataPlaces {
  admin1Code: string | null;
  admin1Name: string | null;
  admin2Code: string | null;
  admin2Name: string | null;
  alternateNames: string | null;
  countryCode: string;
  id: number;
  latitude: number;
  longitude: number;
  modificationDate: Timestamp;
  name: string;
}

export interface Libraries {
  createdAt: Generated<Timestamp>;
  deletedAt: Timestamp | null;
  exclusionPatterns: string[];
  id: Generated<string>;
  importPaths: string[];
  name: string;
  ownerId: string;
  refreshedAt: Timestamp | null;
  updatedAt: Generated<Timestamp>;
  updateId: Generated<string>;
}

export interface Memories {
  createdAt: Generated<Timestamp>;
  data: OnThisDayData;
  deletedAt: Timestamp | null;
  hideAt: Timestamp | null;
  id: Generated<string>;
  isSaved: Generated<boolean>;
  memoryAt: Timestamp;
  ownerId: string;
  seenAt: Timestamp | null;
  showAt: Timestamp | null;
  type: MemoryType;
  updatedAt: Generated<Timestamp>;
  updateId: Generated<string>;
}

export interface Notifications {
  id: Generated<string>;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  deletedAt: Timestamp | null;
  updateId: Generated<string>;
  userId: string;
  level: Generated<NotificationLevel>;
  type: NotificationType;
  title: string;
  description: string | null;
  data: any | null;
  readAt: Timestamp | null;
}

export interface MemoriesAssetsAssets {
  assetsId: string;
  memoriesId: string;
}

export interface Migrations {
  id: Generated<number>;
  name: string;
  timestamp: Int8;
}

export interface MoveHistory {
  entityId: string;
  id: Generated<string>;
  newPath: string;
  oldPath: string;
  pathType: string;
}

export interface NaturalearthCountries {
  admin: string;
  admin_a3: string;
  coordinates: string;
  id: Generated<number>;
  type: string;
}

export interface PartnersAudit {
  deletedAt: Generated<Timestamp>;
  id: Generated<string>;
  sharedById: string;
  sharedWithId: string;
}

export interface Partners {
  createdAt: Generated<Timestamp>;
  inTimeline: Generated<boolean>;
  sharedById: string;
  sharedWithId: string;
  updatedAt: Generated<Timestamp>;
  updateId: Generated<string>;
}

export interface Person {
  birthDate: Timestamp | null;
  color: string | null;
  createdAt: Generated<Timestamp>;
  faceAssetId: string | null;
  id: Generated<string>;
  isFavorite: Generated<boolean>;
  isHidden: Generated<boolean>;
  name: Generated<string>;
  ownerId: string;
  thumbnailPath: Generated<string>;
  updatedAt: Generated<Timestamp>;
  updateId: Generated<string>;
}

export interface Sessions {
  createdAt: Generated<Timestamp>;
  deviceOS: Generated<string>;
  deviceType: Generated<string>;
  id: Generated<string>;
  parentId: string | null;
  expiresAt: Date | null;
  token: string;
  updatedAt: Generated<Timestamp>;
  updateId: Generated<string>;
  userId: string;
  pinExpiresAt: Timestamp | null;
}

export interface SessionSyncCheckpoints {
  ack: string;
  createdAt: Generated<Timestamp>;
  sessionId: string;
  type: SyncEntityType;
  updatedAt: Generated<Timestamp>;
  updateId: Generated<string>;
}

export interface SharedLinkAsset {
  assetsId: string;
  sharedLinksId: string;
}

export interface SharedLinks {
  albumId: string | null;
  allowDownload: Generated<boolean>;
  allowUpload: Generated<boolean>;
  createdAt: Generated<Timestamp>;
  description: string | null;
  expiresAt: Timestamp | null;
  id: Generated<string>;
  key: Buffer;
  password: string | null;
  showExif: Generated<boolean>;
  type: SharedLinkType;
  userId: string;
}

export interface SmartSearch {
  assetId: string;
  embedding: string;
}

export interface SocketIoAttachments {
  created_at: Generated<Timestamp | null>;
  id: Generated<Int8>;
  payload: Buffer | null;
}

export interface SystemConfig {
  key: string;
  value: string | null;
}

export interface SystemMetadata {
  key: string;
  value: Json;
}

export interface TagAsset {
  assetsId: string;
  tagsId: string;
}

export interface Tags {
  color: string | null;
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  parentId: string | null;
  updatedAt: Generated<Timestamp>;
  updateId: Generated<string>;
  userId: string;
  value: string;
}

export interface TagsClosure {
  id_ancestor: string;
  id_descendant: string;
}

export interface TypeormMetadata {
  database: string | null;
  name: string | null;
  schema: string | null;
  table: string | null;
  type: string;
  value: string | null;
}

export interface UserMetadata extends UserMetadataItem {
  userId: string;
}

export interface UsersAudit {
  id: Generated<string>;
  userId: string;
  deletedAt: Generated<Timestamp>;
}

export interface VectorsPgVectorIndexStat {
  idx_growing: ArrayType<Int8> | null;
  idx_indexing: boolean | null;
  idx_options: string | null;
  idx_sealed: ArrayType<Int8> | null;
  idx_size: Int8 | null;
  idx_status: string | null;
  idx_tuples: Int8 | null;
  idx_write: Int8 | null;
  indexname: string | null;
  indexrelid: number | null;
  tablename: string | null;
  tablerelid: number | null;
}

export interface VersionHistory {
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  version: string;
}

export interface DB {
  activity: Activity;
  albums: Albums;
  albums_audit: AlbumsAudit;
  albums_assets_assets: AlbumsAssetsAssets;
  albums_shared_users_users: AlbumsSharedUsersUsers;
  album_users_audit: AlbumUsersAudit;
  api_keys: ApiKeys;
  asset_faces: AssetFaces;
  asset_files: AssetFiles;
  asset_job_status: AssetJobStatus;
  asset_stack: AssetStack;
  assets: Assets;
  assets_audit: AssetsAudit;
  audit: Audit;
  exif: Exif;
  face_search: FaceSearch;
  geodata_places: GeodataPlaces;
  libraries: Libraries;
  memories: Memories;
  memories_assets_assets: MemoriesAssetsAssets;
  migrations: Migrations;
  notifications: Notifications;
  move_history: MoveHistory;
  naturalearth_countries: NaturalearthCountries;
  partners_audit: PartnersAudit;
  partners: Partners;
  person: Person;
  sessions: Sessions;
  session_sync_checkpoints: SessionSyncCheckpoints;
  shared_link__asset: SharedLinkAsset;
  shared_links: SharedLinks;
  smart_search: SmartSearch;
  socket_io_attachments: SocketIoAttachments;
  system_config: SystemConfig;
  system_metadata: SystemMetadata;
  tag_asset: TagAsset;
  tags: Tags;
  tags_closure: TagsClosure;
  typeorm_metadata: TypeormMetadata;
  user_metadata: UserMetadata;
  users: UserTable;
  users_audit: UsersAudit;
  'vectors.pg_vector_index_stat': VectorsPgVectorIndexStat;
  version_history: VersionHistory;
}
