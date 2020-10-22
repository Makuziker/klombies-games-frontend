import { createSlice, PayloadAction, createSelector, createAction } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { STATE_KEY_MAIN } from '../constants';
import { ICurrentUserJoinRoomData, IUsersInRoomData, IMainState } from './types';
import { IUser } from '../../types'

export type MAIN_STATE_SLICE = { [STATE_KEY_MAIN]: IMainState };

const initialState: IMainState = {};

// Selectors
const sliceSelector = (state: MAIN_STATE_SLICE) => state[STATE_KEY_MAIN];

export const selectDisplayName = () => createSelector(sliceSelector, ({ displayName }) => displayName);
export const selectRoomCode = () => createSelector(sliceSelector, ({ roomCode }) => roomCode);
export const selectUsersInRoom = () => createSelector(sliceSelector, ({ usersInRoom }) => usersInRoom);

export const useMainSelectors = () => ({
  selectDisplayName: useMemo(selectDisplayName, []),
  selectRoomCode: useMemo(selectRoomCode, [])
});

// Actions
export const currentUserJoinRoom = createAction<ICurrentUserJoinRoomData>(`${STATE_KEY_MAIN}/currentUserJoinRoom`);

export const usersInRoom = createAction<IUsersInRoomData>(`${STATE_KEY_MAIN}/usersInRoom`);

// Slice
export const mainSlice = createSlice({
  initialState,
  name: STATE_KEY_MAIN,
  reducers: {
    setDisplayName(state, { payload: displayName }: PayloadAction<string>) {
      return {
        ...state,
        displayName
      };
    },
    setRoomCode(state, { payload: roomCode }: PayloadAction<string>) {
      return {
        ...state,
        roomCode
      };
    },
    setUsersInRoom(state, { payload: usersInRoom}: PayloadAction<IUser[]>) {
      return {
        ...state,
        usersInRoom
      };
    }
  }
});

export const { reducer: mainReducer } = mainSlice;
export const {
  setDisplayName,
  setRoomCode,
  setUsersInRoom
} = mainSlice.actions;
export * from './types';
