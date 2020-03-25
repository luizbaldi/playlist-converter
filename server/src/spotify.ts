import { Request, Response } from "express";
import querystring from "querystring";
import request, { RequestCallback } from "request";
import dotenv from "dotenv";
import axios from "axios";

import {
  SpotifyUserInfoBody,
  SpotifyPlaylistsBody,
  SpotifyTracksBody,
  Songs
} from "./types";

import { TrackSearchResponse, PlaylistSnapshotResponse } from "./types/spotify";

dotenv.config();

const {
  SPOTIFY_CLIENT_ID: spotifyClientId,
  SPOTIFY_CLIENT_SECRET: spotifyClientSecret,
  SPOTIFY_REDIRECT_URI: spotifyRedirectUrl,
  FRONTEND_URI: frontendUri
} = process.env;

const baseApiUrl = "https://api.spotify.com/v1";

export const spotifyLogin = (req: Request, res: Response) => {
  const params = querystring.stringify({
    response_type: "code",
    client_id: spotifyClientId,
    redirect_uri: spotifyRedirectUrl,
    scope:
      "playlist-read-private playlist-read-collaborative playlist-modify-public"
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

const getUserInfo = (
  accessToken: string,
  onRequestCallback: RequestCallback
) => {
  const options = {
    url: `${baseApiUrl}/me`,
    headers: { Authorization: `Bearer ${accessToken}` },
    json: true
  };

  request.get(options, onRequestCallback);
};

export const getSpotifyPlaylists = (accessToken: string, res: Response) => {
  getUserInfo(
    accessToken,
    (userError, userResponse, userBody: SpotifyUserInfoBody) => {
      const { id: userId } = userBody;

      request.get(
        {
          url: `${baseApiUrl}/users/${userId}/playlists`,
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

export const getSpotifyPlaylistSongs = (
  accessToken: string,
  playlistId: string
): Promise<Songs> =>
  new Promise((resolve, reject) => {
    request.get(
      {
        url: `${baseApiUrl}/playlists/${playlistId}/tracks?fields=items`,
        headers: { Authorization: `Bearer ${accessToken}` },
        json: true
      },
      (playlistsError, playlistsResponse, playlistsBody: SpotifyTracksBody) => {
        const { error, items = [] } = playlistsBody;

        if (error) {
          reject(error);
          return;
        }

        const songs = items.map(({ track }) => ({
          id: track.id,
          name: `${track.name} - ${track.artists
            .map(({ name }) => name)
            .join(" - ")}`
        }));

        resolve(songs);
      }
    );
  });

export const createSpotifyPlaylist = (
  accessToken: string,
  playlistName: string
): Promise<string> =>
  new Promise((resolve, reject) => {
    getUserInfo(accessToken, (error, response, body: SpotifyUserInfoBody) => {
      const { id: userId } = body;

      request.post(
        {
          url: `${baseApiUrl}/users/${userId}/playlists`,
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          form: JSON.stringify({ name: playlistName }),
          json: true
        },
        (playlistError, playlistResponse, playlistBody) => {
          if (playlistError || playlistBody.error) {
            reject(new Error("Error creating spotify playlist :("));
            return;
          }

          const { id } = playlistBody;

          resolve(id);
        }
      );
    });
  });

export const convertToSpotify = async (
  accessToken: string,
  songs: Songs,
  playlistId: string
) => {
  const requestConfig = {
    headers: { Authorization: `Bearer ${accessToken}` }
  };

  const spotifySongs = await Promise.all(
    songs.map(({ name }) => {
      const params = querystring.stringify({
        type: "track",
        q: name,
        limit: 1
      });

      return axios.get<TrackSearchResponse>(
        `${baseApiUrl}/search?${params}`,
        requestConfig
      );
    })
  );

  const spotifySongsURIs = spotifySongs
    .map(({ data }) =>
      data.tracks.items.length ? data.tracks.items[0].uri : null
    )
    .filter(songId => songId);

  await axios.post<PlaylistSnapshotResponse>(
    `${baseApiUrl}/playlists/${playlistId}/tracks`,
    { uris: spotifySongsURIs },
    requestConfig
  );
};
