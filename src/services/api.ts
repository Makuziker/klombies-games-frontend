import { socket } from '../constants';
import { IUser } from '../types'

/**
 * This file just handles the request made to the server.
 * For listening for responses from the server, see `containers/ApiInit.tsx`
 */

type ICallback<R extends {} = {}> = (payload: { error?: string; request?: R; }) => void;

export function connect() {
  socket.connect();
  console.log('Web socket opened');
}

export function disconnect() {
  console.log('Web socket closed');
  socket.emit('disconnect');
  socket.disconnect();
}

export interface IJoinProps {
  name: string;
  room: string;
}

export interface INewMessageProps {
  text: string;
  owner: IUser
}

export function join({ name, room }: IJoinProps) {
  const callback: ICallback<IJoinProps> = ({ error, request }) => {
    if (error) {
      console.error(error);
      throw new Error(error); // todo handle this more gracefully
    }
  }

  socket.emit('JOIN_ROOM', { name, room }, callback);

  return () => {
    socket.emit('disconnect');
  }
}
