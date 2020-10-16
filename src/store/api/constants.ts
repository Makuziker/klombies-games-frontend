export const SOCKET_IO = {
  JOIN_ROOM: 'join',
  MESSAGE: 'message',
  USER_MESSAGE: 'sendMessage',
  ROOM_DATA: 'roomData',
  READY_TO_START: 'ready to start',
  START_GAME: 'start game',
  DRAW_FROM_DECK: 'draw from deck',
  DRAW_FROM_DISCARD: 'draw from discard',
  DISCARD_FROM_HAND: 'discard from hand',
  UPDATE_PLAYER_HAND: 'update player hand',
  GO_OUT: 'go out',
  ON_CURRENT_USER_JOIN_ROOM: 'current_user_join_room'
};

export const ACTION = {
  ...SOCKET_IO,
  CONNECT: 'API_CONNECT',
  DISCONNECT: 'API_DISCONNECT',
};
