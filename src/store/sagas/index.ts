import { fork } from 'redux-saga/effects';

import { watchCurrentUserJoinRoom } from './currentUserJoinRoom';
import { watchUsersInRoom } from './usersInRoom';
import { watchAddMessage } from './addMessage';
import { watchStartGame } from './startGame';
import { watchUpdateGameState } from './updateGameState';
import { watchUpdateShowGameOverPage } from './updateShowGameOverPage';
import { watchUserLoggedIn } from './userLoggedIn';
import { watchUserSignedUp } from './userSignedUp';

export const sagas = [
  fork(watchCurrentUserJoinRoom),
  fork(watchUsersInRoom),
  fork(watchAddMessage),
  fork(watchStartGame),
  fork(watchUpdateGameState),
  fork(watchUpdateShowGameOverPage),
  fork(watchUserLoggedIn),
  fork(watchUserSignedUp)
];
