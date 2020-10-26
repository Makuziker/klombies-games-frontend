import { fork } from 'redux-saga/effects';

import { watchCurrentUserJoinRoom } from './currentUserJoinRoom';
import { watchUsersInRoom } from './usersInRoom';
import { watchAddMessage } from './addMessage';

export const sagas = [
  fork(watchCurrentUserJoinRoom),
  fork(watchUsersInRoom),
  fork(watchAddMessage)
];
