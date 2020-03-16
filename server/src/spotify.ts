import { Request, Response } from "express";
import querystring from "querystring";
import request from "request";
import dotenv from "dotenv";

import { SpotifyUserInfoBody, SpotifyPlaylistsBody } from "./types";

dotenv.config();

const {
  SPOTIFY_CLIENT_ID: spotifyClientId,
  SPOTIFY_CLIENT_SECRET: spotifyClientSecret,
  SPOTIFY_REDIRECT_URI: spotifyRedirectUrl,
  FRONTEND_URI: frontendUri
} = process.env;

console.log(process.env);

export const spotifyLogin = (req: Request, res: Response) => {
  const params = querystring.stringify({
    response_type: "code",
    client_id: spotifyClientId,
    redirect_uri: spotifyRedirectUrl,
    scope: "playlist-read-private playlist-read-collaborative"
  });

  res.redirect(`https://accounts.spotify.com/authorize?${params}`);
};

export const spotifyCallback = (req: Request, res: Response) => {
  const code = req.query.code || null;
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code,
      redirect_uri: spotifyRedirectUrl,
      grant_type: "authorization_code"
    },
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${spotifyClientId}:${spotifyClientSecret}`
      ).toString("base64")}`
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    const { access_token: accessToken } = body;

    res.redirect(`${frontendUri}/spotify-auth?access_token=${accessToken}`);
  });
};

export const getSpotifyPlaylists = (accessToken: string, res: Response) => {
  const baseUrl = "https://api.spotify.com/v1";
  const options = {
    url: `${baseUrl}/me`,
    headers: { Authorization: `Bearer ${accessToken}` },
    json: true
  };

  request.get(
    options,
    (userError, userResponse, userBody: SpotifyUserInfoBody) => {
      const { id: userId } = userBody;

      request.get(
        {
          url: `${baseUrl}/users/${userId}/playlists`,
          headers: { Authorization: `Bearer ${accessToken}` },
          json: true
        },
        (
          playlistsError,
          playlistsResponse,
          playlistsBody: SpotifyPlaylistsBody
        ) => {
          const { error, items = [] } = playlistsBody;

          if (error) {
            res.status(401).send({ message: error.message });
            return;
          }

          res.send(
            items.map(({ name, id }) => ({
              name,
              id
            }))
          );
        }
      );
    }
  );
};
