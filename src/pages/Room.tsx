import { Button, Container, Grid, Typography } from '@material-ui/core';
import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useRoute } from '../hooks';
import { useAppSelectors, apiReadyToStart } from '../store';
import { IApplicationState } from '../store/types';

export function RoomPage() {
  const routes = useRoute();
  const dispatch = useDispatch();
  const {
    selectDisplayName,
    selectRoomCode,
    selectCurrentUser,
    selectIsGameInSession,
    selectNumUsersInRoom
  } = useAppSelectors();

  const {
    displayName,
    roomCode,
    user,
    isGameInSession,
    numUsersInRoom
  } = useSelector((state: IApplicationState) => ({
    displayName: selectDisplayName(state),
    roomCode: selectRoomCode(state),
    user: selectCurrentUser(state),
    isGameInSession: selectIsGameInSession(state),
    numUsersInRoom: selectNumUsersInRoom(state)
  }));

  const title = useMemo(
    () => `Welcome ${displayName} to the '${roomCode}' room`,
    [displayName, roomCode]
  );

  const onClick = useCallback(() => {
    dispatch(apiReadyToStart());
  }, [dispatch]);

  return isGameInSession ? (
    <Redirect push to={routes.game({ id: roomCode, name: displayName})} />
  ) : (
      <Container>
        <Grid container alignItems="center" direction="column">
          <Typography variant="h3" component="h3">{title}</Typography>
          <Typography paragraph>Click the button when you are ready to start (minimum two players required). The game will start when all players are ready.</Typography>
          <Button
            variant="contained"
            color="primary"
            disabled={user?.readyToStart || numUsersInRoom < 2}
            size="large"
            onClick={onClick}>
            Ready
          </Button>
        </Grid>
      </Container>
    );
}
