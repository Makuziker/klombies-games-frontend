import React, { useMemo, useCallback } from 'react';
import { Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { ICard, useAppSelectors, apiDrawFromDeck, apiDrawFromDiscard, apiDiscardFromHand, apiGoOut } from '../store';
import { PlayerQueue, CardDeck, PlayerHand } from '../components';
import { IApplicationState } from '../store/types';
import { socket } from '../constants';

export function GamePage() {
  const {
    selectHand,
    selectCurrentRound,
    selectDealerIdx,
    selectTurnIdx,
    selectTopCardInDiscard,
    selectUsersInRoom,
    selectPlayerList
  } = useAppSelectors();

  const dispatch = useDispatch();

  const {
    hand,
    currentRound,
    dealerIdx,
    turnIdx,
    topCardInDiscard,
    usersInRoom,
    playerList
  } = useSelector((state: IApplicationState) => ({
    hand: selectHand(state),
    currentRound: selectCurrentRound(state),
    dealerIdx: selectDealerIdx(state),
    turnIdx: selectTurnIdx(state),
    topCardInDiscard: selectTopCardInDiscard(state),
    usersInRoom: selectUsersInRoom(state),
    playerList: selectPlayerList(state)
  }));

  const orderedPlayerData = useMemo(
    () => playerList.map(playerId => {
      const player = usersInRoom.find(user => user.id === playerId);
      if (!player) throw new Error(`Could not find ${playerId} in usersInRoom`);
      return player;
    }),
    [usersInRoom, playerList]
  );

  const isCurrentPlayersTurn = useMemo(
    () => orderedPlayerData[turnIdx].id === socket.id,
    [orderedPlayerData, turnIdx]
  );

  const playerMayDraw = useMemo(
    () => isCurrentPlayersTurn && hand.length === currentRound + 2,
    [isCurrentPlayersTurn, hand, currentRound]
  );

  const playerMayDiscard = useMemo(
    () => isCurrentPlayersTurn && hand.length === currentRound + 3,
    [isCurrentPlayersTurn, hand, currentRound]
  );

  const onDrawFromDeck = useCallback(() => {
    dispatch(apiDrawFromDeck());
  }, [dispatch]);

  const onDrawFromDiscard = useCallback(() => {
    dispatch(apiDrawFromDiscard());
  }, [dispatch]);

  const onDiscardFromHand = useCallback((card: ICard) => {
    console.log('discard from hand');
    dispatch(apiDiscardFromHand({ card }));
  }, [dispatch]);

  const onGoOut = useCallback((groups: ICard[][], discard: ICard) => {
    dispatch(apiGoOut({ groups, discard }));
  }, [dispatch]);

  return (
    <>
      <PlayerQueue
        players={orderedPlayerData}
        turnIdx={turnIdx}
        dealerIdx={dealerIdx}
        isCurrentPlayersTurn={isCurrentPlayersTurn}
      />
      <Typography>Current Round: {currentRound}</Typography>
      <CardDeck
        topCardInDiscard={topCardInDiscard}
        onDrawFromDeck={onDrawFromDeck}
        onDrawFromDiscard={onDrawFromDiscard}
        playerMayDraw={playerMayDraw}
      />
      <PlayerHand
        hand={hand}
        onDiscard={onDiscardFromHand}
        onGoOut={onGoOut}
        playerMayDraw={playerMayDraw}
        playerMayDiscard={playerMayDiscard}
        isCurrentPlayersTurn={isCurrentPlayersTurn}
        anotherPlayerGoneOut={false} // todo
      />
    </>
  );
}