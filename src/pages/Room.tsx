import { Button, Container, Grid, Typography } from '@material-ui/core';
import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useRoute } from '../hooks';
import { useAppSelectors, apiReadyToStart } from '../store';
import { IApplicationState } from '../store/types';

export function RoomPage() {
  const { id: roomId } = useParams<{ id: string }>();
  const routes = useRoute();
  const dispatch = useDispatch();
  const { selectDisplayName, selectRoomCode, selectCurrentUser, selectIsGameInSession } = useAppSelectors();

  const { displayName, roomCode, user, isGameInSession } = useSelector((state: IApplicationState) => ({
    displayName: selectDisplayName(state),
    roomCode: selectRoomCode(state),
    user: selectCurrentUser(state),
    isGameInSession: selectIsGameInSession(state)
  }));

  const title = useMemo(
    () => `Welcome ${displayName} to the '${roomCode}' room`,
    [displayName, roomCode]
  );

  const onClick = useCallback(() => {
    dispatch(apiReadyToStart());
  }, [dispatch]);

  return isGameInSession ? (
    <Redirect push to={routes.game({ id: roomId, name: displayName ?? '' })} />
  ) : (
      <Container>
        <Grid container alignItems="center" direction="column">
          <Typography variant="h2" component="h1">{title}</Typography>
          <Typography paragraph>Click the button when you are ready to start. The game will start when all players are ready.</Typography>
          <Typography paragraph>You can toggle chat at any time by clicking on the icon in the top right corner of the page.</Typography>
          <Button variant="contained" color="primary" disabled={user?.readyToStart} size="large" onClick={onClick}>Ready</Button>
        </Grid>
      </Container>
    );
}
