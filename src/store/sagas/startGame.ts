import { PayloadAction } from '@reduxjs/toolkit';
import { put, take } from 'redux-saga/effects';
import { startGame, IGameState, setGameState } from '../game';

export function* watchStartGame() {
  while (true) {
    const { payload }: PayloadAction<IGameState> = yield take(startGame.toString());
    yield put(setGameState(payload));
  }
}