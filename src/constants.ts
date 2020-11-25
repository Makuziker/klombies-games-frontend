import { io } from 'socket.io-client';

export type IRouteKey = 'home' | 'room' | 'game';

export const ROUTES: Record<IRouteKey, string> = {
  home: '/',
  room: '/room/:id',
  game: '/game/:id',
};

export const API_ENDPOINT = process.env.NODE_ENV === 'development'
  ? 'http://localhost:5000'
  : 'https://klombies-games-api.herokuapp.com/';

export const socket = io(API_ENDPOINT);