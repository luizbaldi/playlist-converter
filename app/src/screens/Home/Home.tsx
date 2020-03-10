import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import { AuthContext } from '../../contexts';
import storage from '../../utils/storage';

import PlatformBox from './components/PlatformBox';

const baseUrl = 'http://localhost:4000';

const Home = () => {
  const { spotifyToken, youtubeToken } = useContext(AuthContext);

  useEffect(() => {
    storage.set('spotifyToken', spotifyToken || '');
  }, [spotifyToken]);

  useEffect(() => {
    storage.set('youtubeToken', youtubeToken || '');
  }, [youtubeToken]);

  return (
    <>
      <StyledHeader>
        <PlatformBox
          label='Spotify'
          connectionHref={`${baseUrl}/spotify-login`}
        />
        <StyledChangeOrder>
          <span>To</span>
          <span>-></span>
          <button>Change order</button>
        </StyledChangeOrder>
        <PlatformBox
          label='Youtube'
          connectionHref={`${baseUrl}/youtube-login`}
        />
      </StyledHeader>
    </>
  );
};

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100vw;
`;

const StyledChangeOrder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Home;
