import { Button, Container, Grid, Typography } from '@material-ui/core';
import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useRoute } from '../hooks';
import { useAppSelectors } from '../store';
import { IApplicationState } from '../store/types';

export function RoomPage() {
  const { id: roomId } = useParams<{ id: string }>();
  const history = useHistory();
  const routes = useRoute();
  const { selectDisplayName, selectRoomCode } = useAppSelectors();

  const { displayName, roomCode } = useSelector((state: IApplicationState) => ({
    displayName: selectDisplayName(state),
    roomCode: selectRoomCode(state),
  }))

  const title = useMemo(
    () => `Welcome ${displayName} to the '${roomCode}' room`,
    [displayName, roomCode]
  );

  const onClick = useCallback(() => {
    history.push(routes.game({ id: roomId, name: displayName ?? '' }));
  }, [displayName, history, roomId, routes]);

  return (
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
