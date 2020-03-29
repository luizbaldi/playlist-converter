import { Request, Response } from "express";

import {
  getSpotifyPlaylists,
  getSpotifyPlaylistSongs,
  createSpotifyPlaylist,
  convertToSpotify
} from "./spotify";

import {
  getYoutubePlaylists,
  getYoutubePlaylistSongs,
  createYoutubePlaylist,
  convertToYoutube
} from "./youtube";

type ConvertPlaylistParams = {
  originPlatform: "youtube" | "spotify";
  destinationPlaylistName: string;
  youtubeToken: string;
  spotifyToken: string;
  originPlaylistId: string;
};

export const getPlaylists = (req: Request, res: Response) => {
  const { access_token: accessToken, type } = req.query;

  if (type === "spotify") {
    getSpotifyPlaylists(accessToken, res);
  } else {
    getYoutubePlaylists(accessToken, res);
  }
};

export const convertPlaylist = async (req: Request, res: Response) => {
  const {
    originPlaylistId,
    originPlatform,
    destinationPlaylistName,
    youtubeToken,
    spotifyToken
  }: ConvertPlaylistParams = req.query;

  try {
    const originPlatformSongs =
      originPlatform === "spotify"
        ? await getSpotifyPlaylistSongs(spotifyToken, originPlaylistId)
        : await getYoutubePlaylistSongs(youtubeToken, originPlaylistId);

    const { id: newPlaylistId, url } =
      originPlatform === "spotify"
        ? await createYoutubePlaylist(youtubeToken, destinationPlaylistName)
        : await createSpotifyPlaylist(spotifyToken, destinationPlaylistName);

    if (originPlatform === "spotify") {
      await convertToYoutube(youtubeToken, originPlatformSongs, newPlaylistId);
    } else {
      await convertToSpotify(spotifyToken, originPlatformSongs, newPlaylistId);
    }

    res.send({ status: "ok", url });
  } catch (error) {
    console.log(error.message);
    res.status(401).send({ message: error.message });
  }
};
