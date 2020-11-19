import { createSelector, createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useMemo } from 'react';

import { STATE_KEY_GAME } from '../constants';
import { IGameState, IPlayerHandData, IShowGameOverPageData } from './types';
import { socket } from '../../constants';

export type GAME_STATE_SLICE = { [STATE_KEY_GAME]: IGameState };

const initialState: IGameState = {
  isGameInSession: false,
  currentRound: 1,
  dealerIdx: 0,
  turnIdx: 1,
  topCardInDiscard: { id: 'placeholder', value: 'JOKER', suit: '' },
  playerList: [],
  players: {},
  playerIdWhoWentOut: null,
  winnerId: null,
  showGameOverPage: false
};

// selectors
const sliceSelector = (state: GAME_STATE_SLICE) => state[STATE_KEY_GAME];

export const selectPlayerIdWhoWentOut = () => createSelector(sliceSelector, ({ playerIdWhoWentOut }) => playerIdWhoWentOut);
export const selectTopCardInDiscard = () => createSelector(sliceSelector, ({ topCardInDiscard }) => topCardInDiscard);
export const selectShowGameOverPage = () => createSelector(sliceSelector, ({ showGameOverPage }) => showGameOverPage);
export const selectIsGameInSession = () => createSelector(sliceSelector, ({ isGameInSession }) => isGameInSession);
export const selectCurrentRound = () => createSelector(sliceSelector, ({ currentRound}) => currentRound);
export const selectValidGroups = () => createSelector(sliceSelector, ({ players }) => players[socket.id].groups);
export const selectPlayerList = () => createSelector(sliceSelector, ({ playerList }) => playerList);
export const selectDealerIdx = () => createSelector(sliceSelector, ({ dealerIdx }) => dealerIdx);
export const selectGameState = () => createSelector(sliceSelector, (state) => state);
export const selectWinnerId = () => createSelector(sliceSelector, ({ winnerId }) => winnerId);
export const selectTurnIdx = () => createSelector(sliceSelector, ({ turnIdx }) => turnIdx);
export const selectPlayers = () => createSelector(sliceSelector, ({ players }) => players);
export const selectHand = () => createSelector(sliceSelector, ({ players }) => players[socket.id].hand);



export const useGameSelectors = () => ({
  selectPlayerIdWhoWentOut: useMemo(selectPlayerIdWhoWentOut, []),
  selectTopCardInDiscard: useMemo(selectTopCardInDiscard, []),
  selectShowGameOverPage: useMemo(selectShowGameOverPage, []),
  selectIsGameInSession: useMemo(selectIsGameInSession, []),
  selectCurrentRound: useMemo(selectCurrentRound, []),
  selectValidGroups: useMemo(selectValidGroups, []),
  selectPlayerList: useMemo(selectPlayerList, []),
  selectGameState: useMemo(selectGameState, []),
  selectDealerIdx: useMemo(selectDealerIdx, []),
  selectWinnerId: useMemo(selectWinnerId, []),
  selectTurnIdx: useMemo(selectTurnIdx, []),
  selectPlayers: useMemo(selectPlayers, []),
  selectHand: useMemo(selectHand, [])
});

// actions
export const startGame = createAction<IGameState>(`${STATE_KEY_GAME}/startGame`);
export const updateGameState = createAction<IGameState>(`${STATE_KEY_GAME}/updateGameState`);
export const updatePlayerHand = createAction<IPlayerHandData>(`${STATE_KEY_GAME}/updatePlayerHand`);
export const updateShowGameOverPage = createAction<IShowGameOverPageData>(`${STATE_KEY_GAME}/updateShowGameOverPage`);

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
        players,
        playerIdWhoWentOut,
        winnerId
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
        players,
        playerIdWhoWentOut,
        winnerId
      }
    },
    setPlayerHand(state, { payload: { hand }}: PayloadAction<IPlayerHandData>) {
      // TODO, useReducer from redux/toolkit
      return {
        ...state
      }
    },
    setShowGameOverPage(state, { payload: { showGameOverPage }}: PayloadAction<IShowGameOverPageData>) {
      return {
        ...state,
        showGameOverPage
      }
    }
  }
});

export const { reducer: gameReducer } = gameSlice;
export const { setGameState, setShowGameOverPage } = gameSlice.actions;
export * from './types';