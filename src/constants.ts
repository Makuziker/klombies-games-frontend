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

export const socket = io(API_ENDPOINT);

export const COGNITO_POOL_DATA = {
  UserPoolId: 'us-east-2_58E81RfFZ',
  ClientId: '4vuceq84nbc6ihkmjahq6iga1o'
};

export const UserPool = new CognitoUserPool(COGNITO_POOL_DATA);