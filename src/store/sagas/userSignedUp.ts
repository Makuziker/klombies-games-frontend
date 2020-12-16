import { PayloadAction } from '@reduxjs/toolkit';
import { put, take } from 'redux-saga/effects';
import { IUserSignedUpData, setUserSignedUp, userSignedUp } from '../main';

export function* watchUserSignedUp() {
  while (true) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { payload }: PayloadAction<IUserSignedUpData> = yield take(userSignedUp.toString());
    yield put(setUserSignedUp(true));
  }
}
