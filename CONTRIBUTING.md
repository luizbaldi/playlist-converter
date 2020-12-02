# Contributing

We want this community to be friendly and respectful to each other. Please
follow it in all your interactions with the project.

### Running locally

First of all, fork and clone the repo.

Then, install all the dependencies (both frontend and backend live on the same
repo, so you'll need to install dependencies for both):

```sh
# install root dependencies
> yarn

# install frontend dependencies
> cd app && yarn

# install server dependencies
> cd ../server && yarn
```

Then, on the server-side, you'll have to add environment variables related to
_spotify_ and _youtube_ creating a `.env/` file on `server/` folder, following
[server/.env.example](https://github.com/luizbaldi/playlist-converter/blob/master/server/.env.example).

Here's an example of how some local environment variables are going to look like
in your .env file besides the ones that need access tokens:

```
FRONTEND_URL=http://localhost:3000
SPOTIFY_REDIRECT_URI=http://localhost:4000/spotify-callback
YOUTUBE_REDIRECT_URL=http://localhost:4000/yt-callback
```

In order to grab the other environment variables (`SPOTIFY_CLIENT_ID`,
`SPOTIFY_CLIENT_SECRET`, `YOUTUBE_API_KEY`, `YOUTUBE_CLIENT_ID`,
`YOUTUBE_SECRET_KEY`) you can checkout the following guides:

- [Spotify guide](https://developer.spotify.com/documentation/general/guides/app-settings/#register-your-app)
- [YouTube guide](https://developers.google.com/youtube/v3/getting-started)

After that, place the credentials on your `.env` file and you're good to start
running the project locally, so:

Run these two commands on separated terminal tabs:

```sh
# starts the frontend
> yarn start:app

# starts the server
> yarn start:server
```
