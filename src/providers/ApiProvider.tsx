import React, { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import {
  SOCKET_IO,
  ICurrentUserJoinRoomData,
  currentUserJoinRoom,
  usersInRoom,
  IUsersInRoomData,
  addMessage,
  IMessageData
} from '../store';
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
    dispatch(usersInRoom(data));
  });

  useSocket<IMessageData>(SOCKET_IO.ON_MESSAGE, (data) => {
    dispatch(addMessage(data));
  });

  return <>{children}</>;
}