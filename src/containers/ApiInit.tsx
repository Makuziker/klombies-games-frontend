import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import socketIO from 'socket.io-client';
import { API_ENDPOINT } from '../constants';
import { SOCKET_IO } from '../store/api/constants';
import { setDisplayName, setRoomCode } from '../store/main';

const socket = socketIO(API_ENDPOINT);

export function ApiInit() {
  const [initialized, setInitalized] = useState(false);

  const dispatch = useDispatch();
  
  const onCurrentUserJoinRoom = useCallback((data: { name: string, room: string }) => {
    console.log(SOCKET_IO.ON_CURRENT_USER_JOIN_ROOM, data);
    const { room, name } = data;
    dispatch(setDisplayName(name));
    dispatch(setRoomCode(room));
  }, [dispatch]);

  useEffect(() => {
    if (!initialized && dispatch) {
      console.log('Listening for events');
      socket.on(SOCKET_IO.ON_CURRENT_USER_JOIN_ROOM, onCurrentUserJoinRoom);
      setInitalized(true);
    }
  }, [dispatch, initialized, onCurrentUserJoinRoom]);

  return null;
}