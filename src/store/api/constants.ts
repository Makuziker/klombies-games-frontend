/**
 * incoming socket.io events from the server
 */
export const SOCKET_IO = {
  ON_USERS_IN_ROOM: 'ON_USERS_IN_ROOM',
  START_GAME: 'START_GAME',
  ON_CURRENT_USER_JOIN_ROOM: 'ON_CURRENT_USER_JOIN_ROOM'
};

/**
 * client-side redux actions - which become socket.io events
 */
export const ACTION = {
  ...SOCKET_IO,
  CONNECT: 'API_CONNECT',
  JOIN_ROOM: 'JOIN_ROOM',
  MESSAGE: 'MESSAGE',
  DRAW_FROM_DECK: 'DRAW_FROM_DECK',
  DRAW_FROM_DISCARD: 'DRAW_FROM_DISCARD',
  DISCARD_FROM_HAND: 'DISCARD_FROM_HAND',
  UPDATE_PLAYER_HAND: 'UPDATE_PLAYER_HAND',
  GO_OUT: 'GO_OUT',
  DISCONNECT: 'API_DISCONNECT',
};
