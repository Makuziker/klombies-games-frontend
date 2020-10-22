import socketIO from 'socket.io-client';

export type IRouteKey = 'home' | 'room' | 'game';

export const ROUTES: Record<IRouteKey, string> = {
  home: '/',
  room: '/room/:id',
  game: '/game/:id'
};

export const API_ENDPOINT = 'localhost:8080';
export const socket = socketIO(API_ENDPOINT);