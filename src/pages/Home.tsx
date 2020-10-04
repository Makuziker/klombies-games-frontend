import React, { useState, useCallback, FormEvent, ChangeEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Typography, Button, TextField, CircularProgress } from '@material-ui/core'

import { useRoute } from '../hooks';
import * as Api from '../services/api';

export interface IHomePageProps {}

export function HomePage() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  const routes = useRoute();

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      Api.join({ name, room });
      history.push(routes.room({ id: room, name }));
    } catch (error) {
      const msg = error.message || error;
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  }, [room, name, history, routes]);

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

  return (
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
