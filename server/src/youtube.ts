import { Request, Response } from "express";
import { google } from "googleapis";
import querystring from "querystring";
import dotenv from "dotenv";

import { Songs, NewPlaylist } from "./types";

dotenv.config();

const {
  YOUTUBE_CLIENT_ID: youtubeClientId,
  YOUTUBE_SECRET_KEY: youtubeSecretKey,
  YOUTUBE_REDIRECT_URL: youtubeRedirectUrl,
  FRONTEND_URL: frontendUrl
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

  res.redirect(`${frontendUrl}/yt-auth?access_token=${tokens.access_token}`);
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
      mine: true,
      maxResults: 20
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
): Promise<NewPlaylist> => {
  youtubeOAuthClient.setCredentials({
    access_token: accessToken
  });

  try {
    const {
      data: { id }
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

    return { id, url: `https://music.youtube.com/playlist?list=${id}` };
  } catch (error) {
    console.log(error.message);
    throw new Error("Error creating youtube playlist :(");
  }
};

export const convertToYoutube = async (
  accessToken: string,
  songs: Songs,
  playlistId: string
) => {
  youtubeOAuthClient.setCredentials({
    access_token: accessToken
  });

  try {
    const youtubeSearches = await Promise.all(
      songs.map(({ name }) =>
        youtubeClient.search.list({
          part: "id",
          q: name,
          maxResults: 1
        })
      )
    );

    const youtubeSongIds = youtubeSearches
      .map(({ data }) =>
        data?.items?.length ? data.items[0].id?.videoId : null
      )
      .filter(songId => songId);

    await Promise.all(
      youtubeSongIds.map(songId =>
        // @ts-ignore
        youtubeClient.playlistItems.insert({
          part: "snippet",
          resource: {
            snippet: {
              playlistId,
              resourceId: {
                videoId: songId,
                kind: "youtube#video"
              }
            }
          }
        })
      )
    );
  } catch (error) {
    console.log("ERROR");
    console.log(error.response);
  }
};
