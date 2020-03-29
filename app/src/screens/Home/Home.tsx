import React, { ChangeEvent, useState, useContext } from "react";
import styled from "styled-components";
import {
  Window,
  WindowHeader,
  WindowContent,
  Button,
  Select,
  TextField,
  Anchor
} from "react95";

import { refreshIcon, spinnerIcon } from "../../icons";
import { capitalizeFirst } from "../../utils/string";
import api from "../../utils/api";
import { ModalContext } from "../../contexts";

import usePlatform from "./usePlatform";
import PlatformBox from "./components/PlatformBox";

const Home = () => {
  const [playlistDestination, setPlaylistDestination] = useState("");
  const [currentPlaylist, setCurrentPlaylist] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useContext(ModalContext);

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
      showAlert("Please, login to both platforms before starting conversion");
      return;
    }

    if (!youtubeToken) {
      showAlert(`Please, login to youtube to continue.`);
      return;
    }

    if (!spotifyToken) {
      showAlert(`Please, login to spotify to continue.`);
      return;
    }

    if (!playlistDestination) {
      showAlert("Please, type a playlist destination name to continue.");
      return;
    }

    if (!currentPlaylist) {
      showAlert("Please, select a origni playlist to be converted.");
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
      setIsLoading(true);
      const {
        data: { url }
      } = await api.get("/convert-playlist", { params });

      showAlert(
        <div style={{ textAlign: "center" }}>
          Playlist successfully converted :)
          {url && (
            <>
              <br />
              <p style={{ marginTop: 12 }}>
                <Anchor href={url} target="__blank">
                  Link
                </Anchor>
              </p>
            </>
          )}
        </div>
      );
    } catch (error) {
      const message = error?.data?.message || "Something went wrong :(";

      showAlert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
                  <StyledConnectLink href={from.href}>
                    Connect
                  </StyledConnectLink>
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
                <StyledRotateIcon
                  src={refreshIcon}
                  alt="Invert platforms icon"
                />
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
            <Button
              size="lg"
              onClick={convertPlaylist}
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? (
                <StyledLoader src={spinnerIcon} alt="Loading spinner" />
              ) : (
                <span>Convert</span>
              )}
            </Button>
          </StyledFooter>
        </WindowContent>
      </Window>
      <StyledFooterMessage>
        Made with 💚 by
        <a href="http://luizbaldi.com/" target="__blank">
          {" Luiz Baldi"}
        </a>
        {` - `}
        <Anchor
          href="https://github.com/luizbaldi/playlist-converter"
          target="__blank"
        >
          Source Code
        </Anchor>
      </StyledFooterMessage>
    </>
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

const StyledFooterMessage = styled.span`
  position: absolute;
  bottom: 8px;
  width: 100%;
  left: 0;
  text-align: center;
  color: #ced0cf;
  font-size: 0.8em;
`;

const StyledLoader = styled.img`
  height: 8px;
`;

export default Home;
