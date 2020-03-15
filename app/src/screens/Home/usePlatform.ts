import { useContext, useCallback, useState, useEffect } from 'react';
import axios from 'axios';

import { spotifyIcon, youtubeIcon } from '../../icons';
import { AuthContext } from '../../contexts';

import { GetPlaylistResponse } from '../../../../server/src/types';

const baseUrl = 'http://localhost:4000';

export type PlatformSource = {
  token: string;
  type: 'youtube' | 'spotify';
  icon: string;
  href: string;
  playlists: { label: string; value: string }[];
  playlistName?: string;
  loading: boolean;
};

const usePlatformReducer = () => {
  const [from, setFrom] = useState<PlatformSource>({
    token: '',
    type: 'spotify',
    icon: spotifyIcon,
    href: `${baseUrl}/spotify-login`,
    loading: false,
    playlists: []
  });

  const [to, setTo] = useState<PlatformSource>({
    token: '',
    type: 'youtube',
    icon: youtubeIcon,
    href: `${baseUrl}/youtube-login`,
    loading: false,
    playlists: []
  });

  const { spotifyToken, youtubeToken, setSpotifyToken } = useContext(
    AuthContext
  );

  const onTogglePress = useCallback(() => {
    setFrom(to);
    setTo(from);
  }, [to, from]);

  const fetchSpotifyPlaylists = async () => {
    if (!spotifyToken) return;

    try {
      setFrom({
        ...from,
        loading: true
      });

      const { data } = await axios.get<GetPlaylistResponse>(
        `${baseUrl}/get-playlists`,
        {
          params: {
            access_token: spotifyToken,
            type: 'spotify'
          }
        }
      );

      const newFrom = {
        ...from,
        playlists: data.map(({ name, id }) => ({
          label: name,
          value: id
        })),
        loading: false
      };

      setFrom(newFrom);
    } catch (error) {
      alert('Your token has expired, please reconnect.');
      setSpotifyToken('');
    }
  };

  useEffect(() => {
    if (from.type === 'spotify') {
      fetchSpotifyPlaylists();
      return;
    }
  }, [to, spotifyToken, youtubeToken]);

  return {
    spotifyToken,
    youtubeToken,
    from: from,
    to: to,
    onTogglePress
  };
};

export default usePlatformReducer;
