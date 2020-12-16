import { PayloadAction } from '@reduxjs/toolkit';
import { put, take } from 'redux-saga/effects';
import { IUserLoggedInData, setIsAuthenticated, userLoggedIn } from '../main';

export function* watchUserLoggedIn() {
  while (true) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { payload }: PayloadAction<IUserLoggedInData> = yield take(userLoggedIn.toString());
    yield put(setIsAuthenticated(true));
  }
}
