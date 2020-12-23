import { createSlice, PayloadAction, createSelector, createAction } from '@reduxjs/toolkit';
import { useMemo } from 'react';

import { STATE_KEY_MAIN } from '../constants';
import { IUserLoggedInData, ICurrentUserJoinRoomData, IUsersInRoomData, IMainState, IMessageData } from './types';
import { IUser, IMessage } from '../../types';
import { socket } from '../../constants';

export type MAIN_STATE_SLICE = { [STATE_KEY_MAIN]: IMainState };

const initialState: IMainState = {
  displayName: '',
  roomCode: '',
  usersInRoom: [],
  messages: [],
  isAuthenticated: false,
  userSignedUp: false,
};

// Selectors
const sliceSelector = (state: MAIN_STATE_SLICE) => state[STATE_KEY_MAIN];

export const selectIsAuthenticated = () => createSelector(sliceSelector, ({ isAuthenticated}) => isAuthenticated);
export const selectUserSignedUp = () => createSelector(sliceSelector, ({ userSignedUp }) => userSignedUp);
export const selectNumUsersInRoom = () => createSelector(sliceSelector, ({ usersInRoom }) => usersInRoom.length);
export const selectDisplayName = () => createSelector(sliceSelector, ({ displayName }) => displayName);
export const selectUsersInRoom = () => createSelector(sliceSelector, ({ usersInRoom }) => usersInRoom);
export const selectRoomCode = () => createSelector(sliceSelector, ({ roomCode }) => roomCode);
export const selectMessages = () => createSelector(sliceSelector, ({ messages }) => messages);
export const selectCurrentUser = () => createSelector(sliceSelector, ({ usersInRoom }) => {
  return usersInRoom.find(u => u.id === socket.id);
});

export const useMainSelectors = () => ({
  selectIsAuthenticated: useMemo(selectIsAuthenticated, []),
  selectNumUsersInRoom: useMemo(selectNumUsersInRoom, []),
  selectUserSignedUp: useMemo(selectUserSignedUp, []),
  selectDisplayName: useMemo(selectDisplayName, []),
  selectUsersInRoom: useMemo(selectUsersInRoom, []),
  selectCurrentUser: useMemo(selectCurrentUser, []),
  selectRoomCode: useMemo(selectRoomCode, []),
  selectMessages: useMemo(selectMessages, []),
});

// Actions
export const currentUserJoinRoom = createAction<ICurrentUserJoinRoomData>(`${STATE_KEY_MAIN}/currentUserJoinRoom`);
export const userLoggedIn = createAction<IUserLoggedInData>(`${STATE_KEY_MAIN}/userLoggedIn`);
export const userSignedUp = createAction(`${STATE_KEY_MAIN}/userSignedUp`);
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
      const messages = state.messages.concat(message);
      return {
        ...state,
        messages
      };
    },
    setIsAuthenticated(state, { payload: isAuthenticated }: PayloadAction<boolean>) {
      return {
        ...state,
        isAuthenticated
      }
    },
    setUserSignedUp(state, { payload: userSignedUp }: PayloadAction<boolean>) {
      return {
        ...state,
        userSignedUp
      }
    }
  }
});

export const { reducer: mainReducer } = mainSlice;
export const {
  setDisplayName,
  setRoomCode,
  setUsersInRoom,
  setMessages,
  setIsAuthenticated,
  setUserSignedUp
} = mainSlice.actions;
export * from './types';
