# playlist-converter

Convert your playlist between spotify and youtube with ease :notes:

## Demo

https://playlist-converter.netlify.com/

## Contribute

If you want to contribute to the repo, please open a
[issue](https://github.com/luizbaldi/playlist-converter/issues/new/choose) so we
can discuss the bug or feature :)

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

After that, you're good to start running the project locally, so:

Run these two commands on separated terminal tabs:

```sh
# starts the frontend
> yarn start:app

# starts the server
> yarn start:server
```
