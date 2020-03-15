import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import querystring from 'querystring';
import { google } from 'googleapis';
import request from 'request';

import { SpotifyUserInfoBody, SpotifyPlaylistsBody } from './types';

dotenv.config();
const app = express();

const {
  SPOTIFY_CLIENT_ID: spotifyClientId,
  SPOTIFY_CLIENT_SECRET: spotifyClientSecret,
  SPOTIFY_REDIRECT_URI: spotifyRedirectUrl,
  YOUTUBE_API_KEY: youtubeApiKey,
  YOUTUBE_CLIENT_ID: youtubeClientId,
  YOUTUBE_SECRET_KEY: youtubeSecretKey,
  YOUTUBE_REDIRECT_URL: youtubeRedirectUrl,
  FRONTEND_URI: frontendUri
} = process.env;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', ['http://localhost:3000']);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/spotify-login', (req: Request, res: Response) => {
  const params = querystring.stringify({
    response_type: 'code',
    client_id: spotifyClientId,
    redirect_uri: spotifyRedirectUrl,
    scope: 'playlist-read-private playlist-read-collaborative'
  });

  res.redirect(`https://accounts.spotify.com/authorize?${params}`);
});

app.get('/spotify-callback', (req: Request, res: Response) => {
  const code = req.query.code || null;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code,
      redirect_uri: spotifyRedirectUrl,
      grant_type: 'authorization_code'
    },
    headers: {
      Authorization: `Basic ${new Buffer(
        `${spotifyClientId}:${spotifyClientSecret}`
      ).toString('base64')}`
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    const { access_token } = body;

    res.redirect(`${frontendUri}/spotify-auth?access_token=${access_token}`);
  });
});

app.get('/youtube-login', (req: Request, res: Response) => {
  const oAuthConn = new google.auth.OAuth2(
    youtubeClientId,
    youtubeSecretKey,
    youtubeRedirectUrl
  );

  const connectionUrl = oAuthConn.generateAuthUrl({
    prompt: 'consent',
    scope: ['https://www.googleapis.com/auth/youtube']
  });

  res.redirect(connectionUrl);
});

app.get('/get-playlists', async (req: Request, res: Response) => {
  const { access_token, type } = req.query;

  if (type === 'spotify') {
    const baseUrl = 'https://api.spotify.com/v1';
    const options = {
      url: `${baseUrl}/me`,
      headers: { Authorization: 'Bearer ' + access_token },
      json: true
    };

    request.get(options, (error, response, body: SpotifyUserInfoBody) => {
      const { id } = body;

      request.get(
        {
          url: `${baseUrl}/users/${id}/playlists`,
          headers: { Authorization: `Bearer ${access_token}` },
          json: true
        },
        (_, response, body: SpotifyPlaylistsBody) => {
          const { error, items = [] } = body;

          if (error) {
            res.status(401).send({ message: error.message });
            return;
          }

          const userPlaylists = items.map(({ name, id }) => ({
            name,
            id
          }));

          res.send(userPlaylists);
        }
      );
    });
  }
});

app.listen(4000);
