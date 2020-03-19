import { Request, Response } from "express";
import { google } from "googleapis";
import querystring from "querystring";
import dotenv from "dotenv";

import { Songs } from "./types";

dotenv.config();

const {
  YOUTUBE_CLIENT_ID: youtubeClientId,
  YOUTUBE_SECRET_KEY: youtubeSecretKey,
  YOUTUBE_REDIRECT_URL: youtubeRedirectUrl,
  FRONTEND_URI: frontendUri
} = process.env;

const youtubeOAuthClient = new google.auth.OAuth2(
  youtubeClientId,
  youtubeSecretKey,
  youtubeRedirectUrl
);

const youtubeClient = google.youtube({
  version: "v3",
  auth: youtubeOAuthClient
});

export const youtubeLogin = (req: Request, res: Response) => {
  const connectionUrl = youtubeOAuthClient.generateAuthUrl({
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/youtube"]
  });

  res.redirect(connectionUrl);
};

export const youtubeCallback = async (req: Request, res: Response) => {
  const { url } = req;
  const { code } = querystring.parse(url.split("/yt-callback?")[1]);
  const { tokens } = await youtubeOAuthClient.getToken(code.toString());

  res.redirect(`${frontendUri}/yt-auth?access_token=${tokens.access_token}`);
};

export const getYoutubePlaylists = async (
  accessToken: string,
  res: Response
) => {
  youtubeOAuthClient.setCredentials({
    access_token: accessToken
  });

  try {
    const {
      data: { items = [] }
    } = await youtubeClient.playlists.list({
      part: "id,snippet",
      mine: true
    });

    res.send(
      items.map(({ id, snippet }) => ({
        id,
        name: snippet?.title
      }))
    );
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};

export const getYoutubePlaylistSongs = async (
  accessToken: string,
  playlistId: string
): Promise<Songs> => {
  youtubeOAuthClient.setCredentials({
    access_token: accessToken
  });

  const {
    data: { items = [] }
  } = await youtubeClient.playlistItems.list({
    playlistId,
    part: "id,snippet"
  });

  return items.map(({ id, snippet }) => ({
    id: id || "",
    name: snippet?.title || ""
  }));
};

export const createYoutubePlaylist = async (
  accessToken: string,
  playlistName: string
): Promise<string> => {
  youtubeOAuthClient.setCredentials({
    access_token: accessToken
  });
  try {
    const {
      data: { id: playlistId }
      // for some reason this lib is not in accordance with the docs :(
      // @ts-ignore
    } = await youtubeClient.playlists.insert({
      part: "snippet, status",
      resource: {
        snippet: {
          title: playlistName
        }
      }
    });

    return playlistId;
  } catch (error) {
    throw new Error("Error creating youtube playlist :(");
  }
};
