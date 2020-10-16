import socketIO from 'socket.io-client';

export type IRouteKey = 'home' | 'lobby' | 'room' | 'game';

export const ROUTES: Record<IRouteKey, string> = {
  home: '/',
  lobby: '/lobby',
  room: '/room/:id',
  game: '/game/:id'
};

export const API_ENDPOINT = 'localhost:8080';
export const socket = socketIO(API_ENDPOINT);