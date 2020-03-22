/**
 * Paging Object wrapper used for retrieving collections from the Spotify API.
 * [](https://developer.spotify.com/web-api/object-model/#paging-object)
 */
interface PagingObject<T> {
  href: string;
  items: T[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

/**
 * Search for a track
 *
 * GET /v1/search?type=track
 * https://developer.spotify.com/web-api/search-item/
 */
export interface TrackSearchResponse {
  tracks: PagingObject<TrackObjectFull>;
}

/**
 * Simplified Album Object
 * [album object (simplified)](https://developer.spotify.com/web-api/object-model/#album-object-simplified)
 */
interface AlbumObjectSimplified {
  album_group?: string;
  album_type: string;
  artists: ArtistObjectSimplified[];
  available_markets?: string[];
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: RestrictionsObject;
  type: "album";
  uri: string;
}

interface RestrictionsObject {
  reason: string;
}

/**
 * External Id object
 * [](https://developer.spotify.com/web-api/object-model/)
 *
 * Note that there might be other types available, it couldn't be found in the docs.
 */
interface ExternalIdObject {
  isrc?: string;
  ean?: string;
  upc?: string;
}

/**
 * Simplified Artist Object
 * [artist object (simplified)](https://developer.spotify.com/web-api/object-model/)
 */
interface ArtistObjectSimplified {
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
}

/**
 * External Url Object
 * [](https://developer.spotify.com/web-api/object-model/)
 *
 * Note that there might be other types available, it couldn't be found in the docs.
 */
interface ExternalUrlObject {
  spotify: string;
}

/**
 * Image Object
 * [](https://developer.spotify.com/web-api/object-model/)
 */
interface ImageObject {
  height?: number;
  url: string;
  width?: number;
}

/**
 * Full Track Object
 * [track object (full)](https://developer.spotify.com/web-api/object-model/#track-object-full)
 */
interface TrackObjectFull extends TrackObjectSimplified {
  album: AlbumObjectSimplified;
  external_ids: ExternalIdObject;
  popularity: number;
}

/**
 * Simplified Track Object
 * [track object (simplified)](https://developer.spotify.com/web-api/object-model/#track-object-simplified)
 */
interface TrackObjectSimplified {
  artists: ArtistObjectSimplified[];
  available_markets?: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  is_playable?: boolean;
  linked_from?: TrackLinkObject;
  name: string;
  preview_url: string;
  track_number: number;
  type: "track";
  uri: string;
}

/**
 * Track Link Object
 * [](https://developer.spotify.com/web-api/object-model/#track-object-simplified)
 */
interface TrackLinkObject {
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  type: "track";
  uri: string;
}

/**
 * Response with Playlist Snapshot
 */
export interface PlaylistSnapshotResponse {
  snapshot_id: string;
}
