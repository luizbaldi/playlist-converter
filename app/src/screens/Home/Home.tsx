import React, { ChangeEvent, useState } from "react";
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
import api from "../../utils/api";

import usePlatform from "./usePlatform";
import PlatformBox from "./components/PlatformBox";

const Home = () => {
  const [playlistDestination, setPlaylistDestination] = useState("");
  const [currentPlaylist, setCurrentPlaylist] = useState<string | null>(null);

  const {
    youtubeToken,
    spotifyToken,
    from,
    to,
    onTogglePress,
    playlists
  } = usePlatform();

  const onPlaylistDestinationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlaylistDestination(e.target.value);
  };

  const onCurrentPlaylistChange = (id: string | number) => {
    setCurrentPlaylist(id.toString());
  };

  const getToken = (type: string) => {
    if (type === "spotify") {
      return spotifyToken;
    }

    return youtubeToken;
  };

  const convertPlaylist = async () => {
    if (!youtubeToken && !spotifyToken) {
      alert("Please, log in to both platforms before starting conversion");
      return;
    }

    if (!youtubeToken) {
      alert(`Please, log in to youtube to continue :)`);
      return;
    }

    if (!spotifyToken) {
      alert(`Please, log in to spotify to continue :)`);
      return;
    }

    if (!playlistDestination) {
      alert("Please, type a playlist destination name to continue :)");
      return;
    }

    if (!currentPlaylist) {
      alert("Please, select a origni playlist to be converted :)");
      return;
    }

    const params = {
      destinationPlaylistName: playlistDestination,
      spotifyToken,
      youtubeToken,
      originPlatform: from.type,
      originPlaylistId: currentPlaylist
    };

    try {
      await api.get("/convert-playlist", { params });

      alert("Playlist successfully converted :)");
    } catch (error) {
      const message = error?.data?.message || "Oops, something went wrong :(";

      alert(message);
    }
  };

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
                <StyledSelect
                  items={playlists.items}
                  onChange={onCurrentPlaylistChange}
                />
              ))}
          </PlatformBox>
          <StyledChangeOrderContainer>
            <Button onClick={onTogglePress}>
              <StyledRotateIcon src={refreshIcon} alt="Invert platforms icon" />
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
                onChange={onPlaylistDestinationChange}
                value={playlistDestination}
              />
            )}
          </PlatformBox>
        </StyledHeader>
        <StyledFooter>
          <Button size="lg" onClick={convertPlaylist} fullWidth>
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
