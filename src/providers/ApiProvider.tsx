import React, { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { SOCKET_IO, ICurrentUserJoinRoomData, currentUserJoinRoom, usersInRoom, IUsersInRoomData } from '../store';
import { useSocket } from '../hooks';

export interface IApiProviderProps {
  children: ReactNode;
}

export function ApiProvider({ children }: IApiProviderProps) {
  const dispatch = useDispatch();

  useSocket<ICurrentUserJoinRoomData>(SOCKET_IO.ON_CURRENT_USER_JOIN_ROOM, (data) => {
    dispatch(currentUserJoinRoom(data));
  });

  useSocket<IUsersInRoomData>(SOCKET_IO.ON_USERS_IN_ROOM, (data) => {
    console.log('recieved socket event', data)
    dispatch(usersInRoom(data))
  })

  return <>{children}</>;
}