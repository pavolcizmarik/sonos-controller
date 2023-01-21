export interface IStore {
  settings: ISettings;
  hasError: boolean;
  errorMessage: string;
  loadingMessage: string;
  discoveringSonos: boolean;
  zoneGroups: Array<IZoneGroups>;
  activeZoneGroupId: string;
  defaultAlbumArtURL: string;
  currentTrackTimer: number;
  previousRoutePath: string;
}

export interface ISettings {
  notifications?: INotifications;
  spotify?: ISpotify;
}

export interface ISpotify {
  refreshToken: string;
  authorized: boolean;
}

export interface INotifications {
  dragAndDropRooms?: INotification;
  dragAndDropTracksInQueue?: INotification;
}

export interface INotification {
  show?: boolean;
  timeout?: number;
  text?: string;
}

export interface IZoneGroups {
  id?: string;
  groupId?: string;
  state?: string;
  actions?: Array<string>;
  coordinator?: ICoordinator;
  members?: Array<string>;
  mute?: boolean;
  playMode?: string;
  queue?: Array<ITrack>;
  track?: ITrack;
  tvPlaying?: boolean;
  volume?: number;
  update?: object;
}

export interface ICoordinator {
  id: string;
  name: string;
  device: IDevice;
  volume: number;
  mute: boolean;
}

export interface IDevice {
  displayName: string;
  host: string;
  id: string;
  name: string;
  options: IDeviceOptions;
  port: number;
  _track?: ITrack;
}

export interface IDeviceOptions {
  endpoints: IDeviceEndpoints;
  spotify: IDeviceSpotify;
}

export interface IDeviceEndpoints {
  transport: string;
  rendering: string;
  device: string;
}

export interface IDeviceSpotify {
  region: string;
}

export interface ITrack {
  id: string;
  title: string;
  album?: string;
  albumArtURI?: string;
  albumArtURL?: string;
  albumArtist?: string;
  artist?: string;
  duration?: number;
  parentID?: string;
  position?: number;
  queuePosition?: number;
}

export interface IAlbum {
  album: string;
  albumArtURI: string;
  artist: string;
  title: string;
  uri: string;
  name: string;
  items: Array<object>;
  artistURI: string;
  total: string;
}

export interface IArtists {
  total?: number;
  items?: Array<IArtistsItems>;
}

export interface IArtistsItems {
  uri: string;
}

export interface IPlaylist {
  albumArtURI?: string;
  items?: IPlaylistItem[];
  name?: string;
  returned?: string;
  total?: string;
  uri?: string;
}

export interface IPlaylistItem {
  album: string;
  albumArtURI: string;
  albumURI: string;
  artist: string;
  artistURI: string;
  title: string;
  uri: string;
}

export interface IDiscoveryAlbums {
  message: string;
  total: number;
  items: IAlbum[];
}
