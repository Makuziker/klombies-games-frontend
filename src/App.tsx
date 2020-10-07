import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core';

import { ROUTES } from './constants';
import { Layout } from './components';
import { HomePage, LobbyPage, RoomPage, GamePage } from './pages';

export default function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Layout>
          <Switch>
            <Route path={ROUTES.home} exact component={HomePage} />
            <Route path={ROUTES.room} exact component={RoomPage} />
            <Route path={ROUTES.lobby} exact component={LobbyPage} />
            <Route path={ROUTES.game} exact component={GamePage} />
          </Switch>
        </Layout>
      </Router>
    </>
  )
}
