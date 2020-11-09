import { PayloadAction } from '@reduxjs/toolkit';
import { put, take } from 'redux-saga/effects';
import { IGameState, updateGameState, setGameState } from '../game';

export function* watchUpdateGameState() {
  while (true) {
    const { payload }: PayloadAction<IGameState> = yield take(updateGameState.toString());
    yield put(setGameState(payload));
  }
}