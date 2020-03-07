import React from 'react';

const baseUrl = 'http://localhost:4000';

function App() {
  return (
    <div>
      <a href={`${baseUrl}/spotify-login`}>Log in with Spotify</a>
      <hr />
      <a href={`${baseUrl}/youtube-login`}>Log in with Youtube</a>
    </div>
  );
}

export default App;
