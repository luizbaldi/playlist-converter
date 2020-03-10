const getPrefixedKey = (key: string) => {
  const prefix = '@playlist-converter';

  return `${prefix}/${key}`;
};

type Keys = 'spotifyToken' | 'youtubeToken';

export default {
  set(key: Keys, value: string) {
    localStorage.setItem(getPrefixedKey(key), value);
  },
  get(key: Keys) {
    return localStorage.getItem(getPrefixedKey(key));
  }
};
