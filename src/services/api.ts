import socketIO from 'socket.io-client';

const ENDPOINT = 'localhost:8080'; // TODO move to env var
const socket = socketIO(ENDPOINT);

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

export function join({ name, room }: IJoinProps) {
  const callback: ICallback<IJoinProps> = ({ error, request }) => {
    if (error) {
      console.error(error);
      throw new Error(error);
    }

    console.log('User joined', request);
  }

  socket.emit('join', { name, room }, callback);

  return () => {
    socket.emit('disconnect');
  }
}