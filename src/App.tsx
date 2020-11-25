import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import { ROUTES } from './constants';
import { Layout } from './components';
import { HomePage, RoomPage, GamePage } from './pages';
import { Providers } from './providers';

export default function App() {
  return (
    <Providers>
      <CssBaseline />
      <Layout>
        <Switch>
          <Route path={ROUTES.home} exact component={HomePage} />
          <Route path={ROUTES.room} exact component={RoomPage} />
          <Route path={ROUTES.game} exact component={GamePage} />
        </Switch>
      </Layout>
    </Providers>
  );
}
