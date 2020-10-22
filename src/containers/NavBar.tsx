import React, { useCallback, useState } from 'react';
import { AppBar, Toolbar, Badge, Button, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ForumIcon from '@material-ui/icons/Forum';
import { useRouteMatch } from 'react-router-dom';

import { ROUTES } from '../constants';
import { ChatPanel } from '../components';

const useStyles = makeStyles(({ zIndex }) => ({
  brand: {
    flex: 1
  },
  appBar: {
    zIndex: zIndex.drawer + 1
  }
}));

export default function NavBar() {
  const [showChat, setShowChat] = useState(false);
  const isHomePage = useRouteMatch({
    exact: true,
    path: ROUTES.home
  });

  const classes = useStyles();

  const toggleChat = useCallback(() => {
    setShowChat(val => !val);
  }, []);

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography color="inherit" className={classes.brand}>
            Klombies Games
          </Typography>
          {!isHomePage && (
            <Button onClick={toggleChat} color="inherit">
              <Badge color="secondary" variant="dot">
                <ForumIcon />
              </Badge>
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <ChatPanel open={showChat} />
    </>
  );
}
