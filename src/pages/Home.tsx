import { Grid, Typography, Button, TextField, CircularProgress, makeStyles } from '@material-ui/core';
import React, { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { useRoute } from '../hooks';
import { apiJoinRoom, useAppSelectors, IApplicationState } from '../store';

export interface IHomePageProps { }

const useStyles = makeStyles(({ spacing }) => ({
  button: {
    marginTop: spacing(2)
  }
}));

export function HomePage() {
  const classes = useStyles();
  const [room, setRoom] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const routes = useRoute();

  const { selectDisplayName, selectRoomCode, selectIsAuthenticated } = useAppSelectors();

  const { roomCode, displayName, isAuthenticated } = useSelector((state: IApplicationState) => ({
    roomCode: selectRoomCode(state),
    displayName: selectDisplayName(state),
    isAuthenticated: selectIsAuthenticated(state),
  }));

  const dispatch = useDispatch();

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    dispatch(apiJoinRoom({ room }));
  }, [dispatch, room]);

  const renderButtonLabel = useCallback(
    () => loading ? <CircularProgress /> : 'Join Room',
    [loading]
  );

  if (!isAuthenticated) return (<Redirect push to={routes.auth} />);
  if (roomCode) return (<Redirect push to={routes.room({ id: roomCode, name: displayName })} />);
  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={10} md={6} lg={4} xl={3}>
        <Typography variant='h3' component='h3' align='center'>Hello ${displayName}. Create or Join a Room.</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Room Code"
            inputProps={{ maxLength: 20 }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setRoom(e.target.value)}
          />
          {errorMessage && (
            <Typography color="error">{errorMessage}</Typography>
          )}
          <Button
            className={classes.button}
            fullWidth
            type="submit"
            variant="contained"
            color="secondary"
            disabled={!room || loading}>
            {renderButtonLabel()}
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}
