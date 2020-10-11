import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core';

import { ROUTES } from './constants';
import { Layout } from './components';
import { HomePage, LobbyPage, RoomPage, GamePage } from './pages';
import Providers from './Providers';

export default function App() {
  return (
    <Providers>
      <CssBaseline />
      <Layout>
        <Switch>
          <Route path={ROUTES.home} exact component={HomePage} />
          <Route path={ROUTES.room} exact component={RoomPage} />
          <Route path={ROUTES.lobby} exact component={LobbyPage} />
          <Route path={ROUTES.game} exact component={GamePage} />
        </Switch>
      </Layout>
    </Providers>
  )
}
