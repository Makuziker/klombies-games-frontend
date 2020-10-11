import React, { useState, useCallback, FormEvent, ChangeEvent } from 'react'
import { Redirect } from 'react-router-dom'
import { Grid, Typography, Button, TextField, CircularProgress } from '@material-ui/core'

import { useRoute } from '../hooks';
import { apiJoinRoom } from '../store/api';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelectors } from '../store';
import { IApplicationState } from '../store/types';

export interface IHomePageProps {}

export function HomePage() {
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
    try {
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

  const renderButtonLabel = useCallback(() => loading ? <CircularProgress /> : 'Join Room', [loading]);

  return displayName && roomCode ? (
    <Redirect push to={routes.room({ id: roomCode, name: displayName })} />
  ) : (
    <Grid container justify="center">
      <Grid item xs={12} md={4}>
        <Typography>Join a Room</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'name')}
          />
          <TextField
            fullWidth
            label="Room"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'room')}
          />
          {errorMessage && (
            <Typography color="error">{errorMessage}</Typography>
          )}
          <Button fullWidth type="submit" variant="contained" color="secondary" disabled={!room || !name}>
            {renderButtonLabel()}
          </Button>
        </form>
      </Grid>
    </Grid>
  )
}
