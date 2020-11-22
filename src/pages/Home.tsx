import React, { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Typography, Button, TextField, CircularProgress, makeStyles } from '@material-ui/core';

import { useRoute } from '../hooks';
import { apiJoinRoom } from '../store/api';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelectors } from '../store';
import { IApplicationState } from '../store/types';

export interface IHomePageProps { }

const useStyles = makeStyles(({ spacing }) => ({
  button: {
    marginTop: spacing(2)
  }
}));

export function HomePage() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const routes = useRoute();

  const { selectDisplayName, selectRoomCode } = useAppSelectors();

  const { roomCode, displayName } = useSelector((state: IApplicationState) => ({
    roomCode: selectRoomCode(state),
    displayName: selectDisplayName(state)
  }));

  const dispatch = useDispatch();

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try { // fix this, try catch doesn't catch a silent dispatch fail
      dispatch(apiJoinRoom({ name, room }));
    } catch (error) {
      const msg = error.message || error;
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  }, [dispatch, name, room]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>, type: 'name' | 'room') => {
    const { value } = event.target;
    switch (type) {
      case 'name':
        setName(value);
        break;
      case 'room':
        setRoom(value);
        break;
      default:
        break;
    }
  }, []);

  const renderButtonLabel = useCallback(
    () => loading ? <CircularProgress /> : 'Join Room',
    [loading]
  );

  return displayName && roomCode ? (
    <Redirect push to={routes.room({ id: roomCode, name: displayName })} />
  ) : (
      <Grid container justify="center">
        <Grid item xs={12} sm={10} md={6} lg={4} xl={3}>
          <Typography variant='h3' component='h3' align='center'>Create or Join a Room</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              inputProps={{ maxLength: 14}}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'name')}
            />
            <TextField
              fullWidth
              label="Room Code"
              inputProps={{ maxLength: 20}}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'room')}
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
              disabled={!room || !name || loading}>
              {renderButtonLabel()}
            </Button>
          </form>
        </Grid>
      </Grid>
    )
}
