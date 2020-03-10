import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { reset, themes } from 'react95';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { AuthRedirect, Home } from './screens';
import { AuthProvider } from './contexts';

const ResetStyles = createGlobalStyle`
  ${reset};

  body {
    background-color: teal;
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const App = () => {
  return (
    <>
      <ResetStyles />
      <Router>
        <Switch>
          <ThemeProvider theme={themes.default}>
            <AuthProvider>
              <Route path='/spotify-auth'>
                <AuthRedirect auth='spotify' />
              </Route>
              <Route path='/yt-auth'>
                <AuthRedirect auth='youtube' />
              </Route>
              <Route path='/'>
                <Home />
              </Route>
            </AuthProvider>
          </ThemeProvider>
        </Switch>
      </Router>
    </>
  );
};

export default App;
