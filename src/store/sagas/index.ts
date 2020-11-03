import { fork } from 'redux-saga/effects';

import { watchCurrentUserJoinRoom } from './currentUserJoinRoom';
import { watchUsersInRoom } from './usersInRoom';
import { watchAddMessage } from './addMessage';
import { watchStartGame } from './startGame';

export const sagas = [
  fork(watchCurrentUserJoinRoom),
  fork(watchUsersInRoom),
  fork(watchAddMessage),
  fork(watchStartGame)
];
