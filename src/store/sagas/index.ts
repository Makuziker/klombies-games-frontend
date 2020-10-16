import { fork } from 'redux-saga/effects';

import { watchCurrentUserJoinRoom } from './currentUserJoinRoom';

export const sagas = [
  fork(watchCurrentUserJoinRoom),
];
