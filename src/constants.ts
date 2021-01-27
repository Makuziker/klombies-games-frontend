import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { io } from 'socket.io-client';

export type IRouteKey = 'home' | 'auth' | 'room' | 'game';

export const ROUTES: Record<IRouteKey, string> = {
  home: '/',
  auth: '/auth',
  room: '/room/:id',
  game: '/game/:id',
};

export const API_ENDPOINT = process.env.NODE_ENV === 'development'
  ? 'http://localhost:4000'
  : 'https://klombies-games-api.herokuapp.com/';

export const socket = io();

export const COGNITO_POOL_DATA = {
  UserPoolId: 'us-west-2_iIiQCj4r5',
  ClientId: '678lnfd0q16bqe1f8oddr84n2l'
};

export const UserPool = new CognitoUserPool(COGNITO_POOL_DATA);