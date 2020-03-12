import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { useAuthParams } from '../../hooks';
import { AuthContext } from '../../contexts';

type Props = {
  auth: 'spotify' | 'youtube';
};

const AuthRedirect = ({ auth }: Props) => {
  const { setSpotifyToken, setYoutubeToken } = useContext(AuthContext);
  const { code } = useAuthParams();

  useEffect(() => {
    switch (auth) {
      case 'spotify':
        setSpotifyToken(code || '');
        break;
      case 'youtube':
        setYoutubeToken(code || '');
        break;
    }
  }, [auth, code, setSpotifyToken, setYoutubeToken]);

  return <Redirect to='/' />;
};

export default AuthRedirect;
