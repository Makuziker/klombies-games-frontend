export type IRouteKey = 'home' | 'lobby' | 'room' | 'game';

export const ROUTES: Record<IRouteKey, string> = {
  home: '/',
  lobby: '/lobby',
  room: '/room/:id',
  game: '/game/:id'
};
