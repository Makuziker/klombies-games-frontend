import { createSelector, createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useMemo } from 'react';

import { STATE_KEY_GAME } from '../constants';
import { IGameState } from './types';
import { socket } from '../../constants';

export type GAME_STATE_SLICE = { [STATE_KEY_GAME]: IGameState };

const initialState: IGameState = {
  isGameInSession: false,
  currentRound: 1,
  dealerIdx: 0,
  turnIdx: 1,
  topCardInDiscard: { id: 'placeholder', value: 'JOKER', suit: '' },
  playerList: [],
  players: {}
};

// selectors
const sliceSelector = (state: GAME_STATE_SLICE) => state[STATE_KEY_GAME];

export const selectGameState = () => createSelector(sliceSelector, (state) => state);
export const selectIsGameInSession = () => createSelector(sliceSelector, ({ isGameInSession }) => isGameInSession);
export const selectHand = () => createSelector(sliceSelector, ({ players }) => players[socket.id].hand);
export const selectCurrentRound = () => createSelector(sliceSelector, ({ currentRound}) => currentRound);
export const selectDealerIdx = () => createSelector(sliceSelector, ({ dealerIdx }) => dealerIdx);
export const selectTurnIdx = () => createSelector(sliceSelector, ({ turnIdx }) => turnIdx);
export const selectTopCardInDiscard = () => createSelector(sliceSelector, ({ topCardInDiscard }) => topCardInDiscard);

export const useGameSelectors = () => ({
  selectGameState: useMemo(selectGameState, []),
  selectIsGameInSession: useMemo(selectIsGameInSession, []),
  selectHand: useMemo(selectHand, []),
  selectCurrentRound: useMemo(selectCurrentRound, []),
  selectDealerIdx: useMemo(selectDealerIdx, []),
  selectTurnIdx: useMemo(selectTurnIdx, []),
  selectTopCardInDiscard: useMemo(selectTopCardInDiscard, [])
});

// actions
export const startGame = createAction<IGameState>(`${STATE_KEY_GAME}/startGame`);

// slice
export const gameSlice = createSlice({
  initialState,
  name: STATE_KEY_GAME,
  reducers: {
    setGameState(state, {
      payload: {
        isGameInSession,
        currentRound,
        dealerIdx,
        turnIdx,
        topCardInDiscard,
        playerList,
        players
      }
    }: PayloadAction<IGameState>) {
      return {
        ...state,
        isGameInSession,
        currentRound,
        dealerIdx,
        turnIdx,
        topCardInDiscard,
        playerList,
        players
      }
    }
  }
});

export const { reducer: gameReducer } = gameSlice;
export const { setGameState } = gameSlice.actions;
export * from './types';