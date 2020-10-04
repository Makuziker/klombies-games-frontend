import { Button, Container, Grid, Typography } from '@material-ui/core';
import React, { useCallback, useMemo, useState } from 'react';
import { Redirect, useHistory, useLocation, useParams } from 'react-router-dom';
import { ROUTES } from '../constants';
import { useRoute } from '../hooks';
import { deparam } from '../services/url';

export function RoomPage() {
  const [redirect, shouldRedirct] = useState(false);
  const { id: roomId } = useParams<{ id: string }>();
  const location = useLocation();
  const history = useHistory();
  const routes = useRoute();

  const name = useMemo(() => deparam<'name'>(location.search).name, [location.search]);
  const title = useMemo(() => `Welcome ${name} to the '${roomId}' room`, [name, roomId]);

  const onClick = useCallback(() => {
    history.push(routes.game({ id: roomId, name }));
  }, [history, name, roomId, routes]);

  return redirect ? (
    <Redirect push to={routes.game({ id: roomId, name })}  />
  ) : (
    <Container>
      <Grid container alignItems="center" direction="column">
        <Typography variant="h2" component="h1">{title}</Typography>
        <Typography paragraph>Once all players are ready, click the button to launch the game.</Typography>
        <Typography paragraph>You can toggle chat at any time by clicking on the icon in the top right corner of the page.</Typography>
        <Button variant="contained" color="primary" size="large" onClick={onClick}>Launch</Button>
      </Grid>
    </Container>
  );
}
