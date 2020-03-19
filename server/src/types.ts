export type SpotifyUserInfoBody = {
  display_name: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  id: string;
  images: string[];
  type: string;
  uri: string;
};

type SpotifyPlaylistItem = {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
};

type BodyError = {
  status: number;
  message: string;
};

export type SpotifyPlaylistsBody = {
  href?: string;
  items?: SpotifyPlaylistItem[];
  limit?: number;
  offset?: number;
  total?: number;
  error?: BodyError;
};

export type GetPlaylistResponse = {
  name: string;
  id: string;
}[];

export type SpotifyTracksBody = {
  items: {
    track: {
      id: string;
      name: string;
      artists: {
        id: string;
        name: string;
      }[];
    };
  }[];
  error?: BodyError;
};

export type Songs = {
  id: string;
  name: string;
}[];
