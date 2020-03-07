import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import querystring from 'querystring';
import { google } from 'googleapis';

dotenv.config();
const app = express();

const {
  SPOTIFY_CLIENT_ID: spotifyClientId,
  SPOTIFY_CLIENT_SECRET: spotifyClientSecret,
  SPOTIFY_REDIRECT_URI: spotifyRedirectUrl,
  YOUTUBE_API_KEY: youtubeApiKey,
  YOUTUBE_CLIENT_ID: youtubeClientId,
  YOUTUBE_SECRET_KEY: youtubeSecretKey,
  YOUTUBE_REDIRECT_URL: youtubeRedirectUrl
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

app.listen(4000);
