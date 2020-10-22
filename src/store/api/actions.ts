import { createAction } from '@reduxjs/toolkit';
import { ACTION } from './constants';
import { IJoinProps, INewMessageProps } from '../../services/api';

export const apiConnect = createAction(ACTION.CONNECT);
export const apiDisconnect = createAction(ACTION.DISCONNECT);

export const apiJoinRoom = createAction<IJoinProps>(ACTION.JOIN_ROOM);

export const apiAddMessage = createAction<INewMessageProps>(ACTION.MESSAGE);
