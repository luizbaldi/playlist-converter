import {
  useContext,
  useCallback,
  useState,
  useEffect,
  ChangeEvent
} from "react";
import axios from "axios";

import { spotifyIcon, youtubeIcon } from "../../icons";
import { AuthContext } from "../../contexts";

import { GetPlaylistResponse } from "../../../../server/src/types";

const baseUrl = "http://localhost:4000";

type Playlists = {
  loading: boolean;
  items: { label: string; value: string }[];
};

export type PlatformSource = {
  token: string;
  type: "youtube" | "spotify";
  icon: string;
  href: string;
};

const usePlatformReducer = () => {
  const [from, setFrom] = useState<PlatformSource>({
    token: "",
    type: "spotify",
    icon: spotifyIcon,
    href: `${baseUrl}/spotify-login`
  });

  const [to, setTo] = useState<PlatformSource>({
    token: "",
    type: "youtube",
    icon: youtubeIcon,
    href: `${baseUrl}/youtube-login`
  });

  const [playlists, setPlaylists] = useState<Playlists>({
    loading: false,
    items: []
  });

  const [playlistName, setPlaylistName] = useState("");

  const {
    spotifyToken,
    youtubeToken,
    setSpotifyToken,
    setYoutubeToken
  } = useContext(AuthContext);

  const onTogglePress = useCallback(() => {
    setFrom(to);
    setTo(from);
  }, [to, from]);

  const fetchPlaylists = async () => {
    const currentToken = from.type === "spotify" ? spotifyToken : youtubeToken;

    if (!currentToken) return;

    try {
      setPlaylists({
        ...playlists,
        loading: true
      });

      const { data } = await axios.get<GetPlaylistResponse>(
        `${baseUrl}/get-playlists`,
        {
          params: {
            access_token: currentToken,
            type: from.type
          }
        }
      );

      setPlaylists({
        loading: false,
        items: data.map(({ name, id }) => ({
          label: name,
          value: id
        }))
      });
    } catch (error) {
      alert("Your token has expired, please reconnect.");

      if (from.type === "spotify") {
        setSpotifyToken("");
      } else {
        setYoutubeToken("");
      }
    }
  };

  const onPlaylistNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlaylistName(e.target.value);
  };

  useEffect(() => {
    fetchPlaylists();
  }, [to, spotifyToken, youtubeToken]);

  return {
    spotifyToken,
    youtubeToken,
    from,
    to,
    onTogglePress,
    playlistName,
    onPlaylistNameChange,
    playlists
  };
};

export default usePlatformReducer;
