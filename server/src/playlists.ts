import { Request, Response } from "express";

import {
  getSpotifyPlaylists,
  getSpotifyPlaylistSongs,
  createSpotifyPlaylist
} from "./spotify";

import {
  getYoutubePlaylists,
  getYoutubePlaylistSongs,
  createYoutubePlaylist
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

  const songs =
    originPlatform === "spotify"
      ? await getSpotifyPlaylistSongs(spotifyToken, originPlaylistId)
      : await getYoutubePlaylistSongs(youtubeToken, originPlaylistId);

  /* eslint-disable @typescript-eslint/no-unused-expressions */
  const newPlaylistId =
    originPlatform === "youtube"
      ? await createSpotifyPlaylist(spotifyToken, destinationPlaylistName)
      : await createYoutubePlaylist(youtubeToken, destinationPlaylistName);
};
