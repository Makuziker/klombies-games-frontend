import socketIO from 'socket.io-client';

const ENDPOINT = 'localhost:8080'; // TODO move to env var

const socket = socketIO(ENDPOINT);

export function join({ name, room }: {name: string, room: string}) {
  socket.emit('join', { name, room }, (error: unknown) => {
    debugger;
    // throw new Error(error as string);
  });

  return () => {
    socket.emit('disconnect');
  }
}