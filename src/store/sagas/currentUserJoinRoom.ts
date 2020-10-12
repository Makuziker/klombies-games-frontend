import { PayloadAction } from '@reduxjs/toolkit';
import { put, take } from 'redux-saga/effects';
import { currentUserJoinRoom, ICurrentUserJoinRoomData, setDisplayName, setRoomCode } from '../main';

export function* watchCurrentUserJoinRoom() {
  while (true) {
    const {
      payload: {
        user: {
          name,
          room
        }
      }
    }: PayloadAction<ICurrentUserJoinRoomData> = yield take(currentUserJoinRoom.toString());

    yield put(setDisplayName(name));
    yield put(setRoomCode(room))
  }
}