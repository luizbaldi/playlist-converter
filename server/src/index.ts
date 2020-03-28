import express from "express";
import dotenv from "dotenv";

import { spotifyLogin, spotifyCallback } from "./spotify";
import { youtubeLogin, youtubeCallback } from "./youtube";
import { getPlaylists, convertPlaylist } from "./playlists";

dotenv.config();

const app = express();

const { PORT = 4000, FRONTEND_URL: frontendUrl = "" } = process.env;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", [frontendUrl]);
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
app.get("/get-playlists", getPlaylists);
app.get("/convert-playlist", convertPlaylist);

app.listen(PORT, () => {
  console.log("Server started at port 4000");
});
