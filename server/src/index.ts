import express, { Request, Response } from "express";

import { spotifyLogin, spotifyCallback, getSpotifyPlaylists } from "./spotify";
import { youtubeLogin, youtubeCallback, getYoutubePlaylists } from "./youtube";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", ["http://localhost:3000"]);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/* spotify routes */
app.get("/spotify-login", spotifyLogin);
app.get("/spotify-callback", spotifyCallback);

/* youtube routes */
app.get("/youtube-login", youtubeLogin);
app.get("/yt-callback", youtubeCallback);

/* generic routes */
app.get("/get-playlists", (req: Request, res: Response) => {
  const { access_token: accessToken, type } = req.query;

  if (type === "spotify") {
    getSpotifyPlaylists(accessToken, res);
  } else {
    getYoutubePlaylists(accessToken, res);
  }
});

app.listen(4000, () => {
  console.log("Server started at port 4000");
});
