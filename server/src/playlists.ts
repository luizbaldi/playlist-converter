import { Request, Response } from "express";

import { getSpotifyPlaylists, getSpotifyPlaylistSongs } from "./spotify";
import { getYoutubePlaylists, getYoutubePlaylistSongs } from "./youtube";

type ConvertPlaylistParams = {
  originPlatform: "youtube" | "spotify";
  destinationPlaylistName: string;
  originToken: string;
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
    originToken,
    originPlaylistId,
    originPlatform,
    destinationPlaylistName
  }: ConvertPlaylistParams = req.query;

  const songs =
    originPlatform === "spotify"
      ? await getSpotifyPlaylistSongs(originToken, originPlaylistId)
      : await getYoutubePlaylistSongs(originToken, originPlaylistId);

  console.log(songs);
};
