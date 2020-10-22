import { PayloadAction } from '@reduxjs/toolkit';
import { put, take } from 'redux-saga/effects';
import { usersInRoom, IUsersInRoomData, setUsersInRoom } from '../main';

export function* watchUsersInRoom() {
  while (true) {
    const data: PayloadAction<IUsersInRoomData> = yield take(usersInRoom.toString());
    yield put(setUsersInRoom(data.payload.usersInRoom));
  }
}
