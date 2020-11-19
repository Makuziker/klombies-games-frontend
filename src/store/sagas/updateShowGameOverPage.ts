import { PayloadAction } from '@reduxjs/toolkit';
import { put, take } from 'redux-saga/effects';
import { updateShowGameOverPage, setShowGameOverPage, IShowGameOverPageData } from '../game';

export function* watchUpdateShowGameOverPage() {
  while (true) {
    const { payload }: PayloadAction<IShowGameOverPageData> = yield take(updateShowGameOverPage.toString());
    yield put(setShowGameOverPage(payload));
  }
}