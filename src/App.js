import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';

import Join from './components/Join'
import Lobby from './components/Lobby'

const App = () => {
  return (
    <>
      <CssBaseline />
      <Router>
        <Route path="/" exact component={Join} />
        <Route path="/lobby" component={Lobby} />
      </Router>
    </>
  )
}

export default App
