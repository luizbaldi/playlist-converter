import React from "react";
import styled from "styled-components";
import {
  Window,
  WindowHeader,
  WindowContent,
  Button,
  Select,
  TextField
} from "react95";

import { refreshIcon } from "../../icons";
import { capitalizeFirst } from "../../utils/string";

import usePlatform from "./usePlatform";
import PlatformBox from "./components/PlatformBox";

const Home = () => {
  const {
    youtubeToken,
    spotifyToken,
    from,
    to,
    onTogglePress,
    playlistName,
    onPlaylistNameChange,
    playlists
  } = usePlatform();

  const getToken = (type: string) => {
    if (type === "spotify") {
      return spotifyToken;
    }

    return youtubeToken;
  };

  console.log({ youtubeToken, spotifyToken });

  return (
    <Window>
      <StyledWindowHeader>
        <span>playlist-converter.exe</span>
      </StyledWindowHeader>
      <WindowContent>
        <StyledHeader>
          <PlatformBox
            label="From:"
            platform={capitalizeFirst(from.type)}
            icon={from.icon}
          >
            {!getToken(from.type) && (
              <Button>
                <StyledConnectLink href={from.href}>Connect</StyledConnectLink>
              </Button>
            )}
            {getToken(from.type) &&
              (playlists.loading ? (
                <StyledLoading>Loading...</StyledLoading>
              ) : (
                <StyledSelect items={playlists.items} />
              ))}
          </PlatformBox>
          <StyledChangeOrderContainer>
            <Button onClick={onTogglePress}>
              <StyledRotateIcon src={refreshIcon} alt="Refresh icon" />
            </Button>
          </StyledChangeOrderContainer>
          <PlatformBox
            label="To:"
            platform={capitalizeFirst(to.type)}
            icon={to.icon}
          >
            {!getToken(to.type) ? (
              <Button>
                <StyledConnectLink href={to.href}>Connect</StyledConnectLink>
              </Button>
            ) : (
              <TextField
                placeholder="Your playlist name"
                width="80%"
                onChange={onPlaylistNameChange}
                value={playlistName}
              />
            )}
          </PlatformBox>
        </StyledHeader>
        <StyledFooter>
          <Button size="lg" fullWidth>
            Convert
          </Button>
        </StyledFooter>
      </WindowContent>
    </Window>
  );
};

const StyledWindowHeader = styled(WindowHeader)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const StyledChangeOrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 32px;
`;

const StyledFooter = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 22px;
`;

const StyledRotateIcon = styled.img`
  rotate: 90deg;
  height: 20px;
`;

const StyledConnectLink = styled.a`
  font-size: 0.9em;
`;

const StyledSelect = styled(Select)`
  width: 80%;
`;

const StyledLoading = styled.span`
  font-size: 0.8em;
`;

export default Home;
