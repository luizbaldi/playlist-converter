import { useContext, useCallback, useState, useEffect } from "react";

import { spotifyIcon, youtubeIcon } from "../../icons";
import { AuthContext } from "../../contexts";
import api, { baseUrl } from "../../utils/api";

import { GetPlaylistResponse } from "../../../../server/src/types";

type Playlist = { label: string; value: string };

type Playlists = {
  loading: boolean;
  items: Playlist[];
};

export type PlatformSource = {
  type: "youtube" | "spotify";
  icon: string;
  href: string;
};

const usePlatformReducer = () => {
  const [from, setFrom] = useState<PlatformSource>({
    type: "spotify",
    icon: spotifyIcon,
    href: `${baseUrl}/spotify-login`
  });

  const [to, setTo] = useState<PlatformSource>({
    type: "youtube",
    icon: youtubeIcon,
    href: `${baseUrl}/youtube-login`
  });

  const [playlists, setPlaylists] = useState<Playlists>({
    loading: false,
    items: []
  });

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

      const { data } = await api.get<GetPlaylistResponse>(`/get-playlists`, {
        params: {
          access_token: currentToken,
          type: from.type
        }
      });

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

  useEffect(() => {
    fetchPlaylists();
  }, [to, spotifyToken, youtubeToken]);

  return {
    spotifyToken,
    youtubeToken,
    from,
    to,
    onTogglePress,
    playlists
  };
};

export default usePlatformReducer;
