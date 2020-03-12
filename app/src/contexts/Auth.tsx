import React, { createContext, useState } from 'react';

import storage from '../utils/storage';

type AuthContext = {
  spotifyToken: string;
  setSpotifyToken(token: string): void;
  youtubeToken: string;
  setYoutubeToken(token: string): void;
};

const AuthContext = createContext<AuthContext>({
  spotifyToken: '',
  setSpotifyToken: () => {},
  youtubeToken: '',
  setYoutubeToken: () => {}
});

type Props = {
  children: React.ReactNode;
};

const storageSpotifyToken = storage.get('spotifyToken');
const storageYoutubeToken = storage.get('youtubeToken');

const AuthProvider = ({ children }: Props) => {
  const [spotifyToken, setSpotifyTokenState] = useState(
    storageSpotifyToken || ''
  );
  const [youtubeToken, setYoutubeTokenState] = useState(
    storageYoutubeToken || ''
  );

  const setSpotifyToken = (token: string) => {
    setSpotifyTokenState(token);
    storage.set('spotifyToken', token);
  };

  const setYoutubeToken = (token: string) => {
    setYoutubeTokenState(token);
    storage.set('youtubeToken', token);
  };

  return (
    <AuthContext.Provider
      value={{
        spotifyToken,
        setSpotifyToken,
        youtubeToken,
        setYoutubeToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
