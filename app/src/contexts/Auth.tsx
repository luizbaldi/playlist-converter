import React, { createContext, useState } from 'react';

import storage from '../utils/storage';

type AuthContext = {
  spotifyToken: string | null;
  setSpotifyToken(token: string | null): void;
  youtubeToken: string | null;
  setYoutubeToken(token: string | null): void;
};

const AuthContext = createContext<AuthContext>({
  spotifyToken: null,
  setSpotifyToken: () => {},
  youtubeToken: null,
  setYoutubeToken: () => {}
});

type Props = {
  children: React.ReactNode;
};

const storageSpotifyToken = storage.get('spotifyToken');
const storageYoutubeToken = storage.get('youtubeToken');

const AuthProvider = ({ children }: Props) => {
  const [spotifyToken, setSpotifyToken] = useState(storageSpotifyToken);
  const [youtubeToken, setYoutubeToken] = useState(storageYoutubeToken);

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
