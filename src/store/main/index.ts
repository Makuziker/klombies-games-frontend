import { createSlice, PayloadAction, createSelector, createAction } from '@reduxjs/toolkit';
import { useMemo } from 'react';

import { STATE_KEY_MAIN } from '../constants';
import { ICurrentUserJoinRoomData, IUsersInRoomData, IMainState, IMessageData } from './types';
import { IUser, IMessage } from '../../types';
import { socket } from '../../constants';

export type MAIN_STATE_SLICE = { [STATE_KEY_MAIN]: IMainState };

const initialState: IMainState = {};

// Selectors
const sliceSelector = (state: MAIN_STATE_SLICE) => state[STATE_KEY_MAIN];

export const selectDisplayName = () => createSelector(sliceSelector, ({ displayName }) => displayName);
export const selectRoomCode = () => createSelector(sliceSelector, ({ roomCode }) => roomCode);
export const selectUsersInRoom = () => createSelector(sliceSelector, ({ usersInRoom }) => usersInRoom);
export const selectMessages = () => createSelector(sliceSelector, ({ messages }) => messages);
export const selectCurrentUser = () => createSelector(sliceSelector, ({ usersInRoom }) => {
  return usersInRoom && usersInRoom.find(u => u.id === socket.id);
});

export const useMainSelectors = () => ({
  selectDisplayName: useMemo(selectDisplayName, []),
  selectRoomCode: useMemo(selectRoomCode, []),
  selectUsersInRoom: useMemo(selectUsersInRoom, []),
  selectMessages: useMemo(selectMessages, []),
  selectCurrentUser: useMemo(selectCurrentUser, [])
});

// Actions
export const currentUserJoinRoom = createAction<ICurrentUserJoinRoomData>(`${STATE_KEY_MAIN}/currentUserJoinRoom`);

export const usersInRoom = createAction<IUsersInRoomData>(`${STATE_KEY_MAIN}/usersInRoom`);

export const addMessage = createAction<IMessageData>(`${STATE_KEY_MAIN}/addMessage`);

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
    setUsersInRoom(state, { payload: usersInRoom }: PayloadAction<IUser[]>) {
      return {
        ...state,
        usersInRoom
      };
    },
    setMessages(state, { payload: message }: PayloadAction<IMessage>) {
      const messages = state.messages ? state.messages.concat(message) : [message];
      return {
        ...state,
        messages
      };
    }
  }
});

export const { reducer: mainReducer } = mainSlice;
export const {
  setDisplayName,
  setRoomCode,
  setUsersInRoom,
  setMessages
} = mainSlice.actions;
export * from './types';
