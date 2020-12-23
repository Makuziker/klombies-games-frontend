import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createMuiTheme, CssBaseline } from '@material-ui/core';

import { ROUTES } from './constants';
import { Layout } from './components';
import { HomePage, RoomPage, GamePage, AuthPage } from './pages';
import { Providers } from './providers';
import { AuthGuard } from './components';

export default function App() {
  const theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#8e62fbb0'
      },
      secondary: {
        main: '#943e6ec7'
      }
    }
  });

  return (
    <Providers theme={theme}>
      <CssBaseline />
      <Layout>
        <AuthGuard>
          <Switch>
            <Route path={ROUTES.home} exact component={HomePage} />
            <Route path={ROUTES.auth} exact component={AuthPage} />
            <Route path={ROUTES.room} exact component={RoomPage} />
            <Route path={ROUTES.game} exact component={GamePage} />
          </Switch>
        </AuthGuard>
      </Layout>
    </Providers>
  );
}
