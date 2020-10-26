import { PayloadAction } from '@reduxjs/toolkit';
import { put, take } from 'redux-saga/effects';
import { addMessage, IMessageData, setMessages } from '../main';

export function* watchAddMessage() {
  while (true) {
    const { payload }: PayloadAction<IMessageData> = yield take(addMessage.toString());
    yield put(setMessages(payload));
  }
}
