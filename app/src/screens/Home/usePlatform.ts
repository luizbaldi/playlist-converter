import { useReducer, useContext, useEffect, useCallback } from 'react';
import produce from 'immer';

import { spotifyIcon, youtubeIcon } from '../../icons';
import { AuthContext } from '../../contexts';
import storage from '../../utils/storage';

const baseUrl = 'http://localhost:4000';

type PlatformSource = {
  token: string;
  type: string;
  icon: string;
  href: string;
  playlists?: string[];
  playlistName?: string;
};

type PlatformState = {
  from: PlatformSource;
  to: PlatformSource;
  spotifyToken: string;
  youtubeToken: string;
};

type PlatformActions =
  | { type: 'TOGGLE' }
  | { type: 'SET_YOUTUBE_TOKEN'; payload: string }
  | { type: 'SET_SPOTIFY_TOKEN'; payload: string };

const initialState = {
  from: {
    token: '',
    type: 'spotify',
    icon: spotifyIcon,
    href: `${baseUrl}/spotify-login`
  },
  to: {
    token: '',
    type: 'youtube',
    icon: youtubeIcon,
    href: `${baseUrl}/youtube-login`
  },
  youtubeToken: '',
  spotifyToken: ''
};

const reducer = (
  state: PlatformState,
  action: PlatformActions
): PlatformState =>
  produce(state, draft => {
    switch (action.type) {
      case 'TOGGLE':
        draft.from = state.to;
        draft.to = state.from;
        break;
      case 'SET_SPOTIFY_TOKEN':
        draft.spotifyToken = action.payload;
        break;
      case 'SET_YOUTUBE_TOKEN':
        draft.spotifyToken = action.payload;
        break;
      default:
        return draft;
    }
  });

const usePlatformReducer = () => {
  const { spotifyToken, youtubeToken } = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const token = spotifyToken || '';

    storage.set('spotifyToken', token);
    dispatch({ type: 'SET_SPOTIFY_TOKEN', payload: token });
  }, [spotifyToken]);

  useEffect(() => {
    const token = youtubeToken || '';

    storage.set('youtubeToken', token);
    dispatch({ type: 'SET_SPOTIFY_TOKEN', payload: token });
  }, [youtubeToken]);

  const onTogglePress = useCallback(() => {
    dispatch({ type: 'TOGGLE' });
  }, []);

  return {
    spotifyToken,
    youtubeToken,
    from: state.from,
    to: state.to,
    onTogglePress
  };
};

export default usePlatformReducer;
