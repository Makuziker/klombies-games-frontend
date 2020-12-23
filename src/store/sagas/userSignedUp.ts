import { put, take } from 'redux-saga/effects';
import { setUserSignedUp, userSignedUp } from '../main';

export function* watchUserSignedUp() {
  while (true) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { payload } = yield take(userSignedUp.toString());
    yield put(setUserSignedUp(true));
  }
}
