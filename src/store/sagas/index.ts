import { fork } from 'redux-saga/effects';

import { watchCurrentUserJoinRoom } from './currentUserJoinRoom';
import { watchUsersInRoom } from './usersInRoom'

export const sagas = [
  fork(watchCurrentUserJoinRoom),
  fork(watchUsersInRoom)
];
