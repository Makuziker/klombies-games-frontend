import { socket } from '../constants';
import { ACTION } from '../store/api/constants';
import { IUser } from '../types';

/**
 * This file handles the request made to the server.
 * For listening for responses from the server, see `containers/ApiInit.tsx`
 */

export type ICallback<R extends {} = {}> = (payload: { error?: string; request?: R; }) => void;

export interface IJoinProps {
  name: string;
  room: string;
}

export interface INewMessageProps {
  text: string;
  owner: IUser
}

const callback: ICallback = ({ error, request }) => {
  if (error) {
    console.error(error, request);
    throw new Error(error); // todo handle this more gracefully
  }
}

export function connect() {
  socket.connect();
  console.log('Web socket opened');
}

export function disconnect() {
  console.log('Web socket closed');
  socket.emit('disconnect');
  socket.disconnect();
}

export function join({ name, room }: IJoinProps) {
  socket.emit(ACTION.JOIN_ROOM, { name, room }, callback);
  return () => {
    socket.emit('disconnect');
  }
}

export function sendMessage({ text, owner }: INewMessageProps) {
  socket.emit(ACTION.MESSAGE, { text, owner }, callback);
  return () => {
    socket.emit('disconnect');
  }
}