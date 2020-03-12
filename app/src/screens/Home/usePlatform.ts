import { useContext, useCallback, useState } from 'react';

import { spotifyIcon, youtubeIcon } from '../../icons';
import { AuthContext } from '../../contexts';

const baseUrl = 'http://localhost:4000';

export type PlatformSource = {
  token: string;
  type: 'youtube' | 'spotify';
  icon: string;
  href: string;
  playlists?: string[];
  playlistName?: string;
};

const usePlatformReducer = () => {
  const [from, setFrom] = useState<PlatformSource>({
    token: '',
    type: 'spotify',
    icon: spotifyIcon,
    href: `${baseUrl}/spotify-login`
  });

  const [to, setTo] = useState<PlatformSource>({
    token: '',
    type: 'youtube',
    icon: youtubeIcon,
    href: `${baseUrl}/youtube-login`
  });

  const { spotifyToken, youtubeToken } = useContext(AuthContext);

  const onTogglePress = useCallback(() => {
    setFrom(to);
    setTo(from);
  }, [to, from]);

  return {
    spotifyToken,
    youtubeToken,
    from: from,
    to: to,
    onTogglePress
  };
};

export default usePlatformReducer;
