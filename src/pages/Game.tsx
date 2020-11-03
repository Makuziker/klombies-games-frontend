import React from 'react';
import { Button, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { useAppSelectors } from '../store';
import { useSelector } from 'react-redux';
import { IApplicationState } from '../store/types';

export function GamePage() {
  const {
    selectHand,
    selectCurrentRound,
    selectDealerIdx,
    selectTurnIdx,
    selectTopCardInDiscard
  } = useAppSelectors();

  const {
    hand,
    currentRound,
    dealerIdx,
    turnIdx,
    topCardInDiscard
  } = useSelector((state: IApplicationState) => ({
    hand: selectHand(state),
    currentRound: selectCurrentRound(state),
    dealerIdx: selectDealerIdx(state),
    turnIdx: selectTurnIdx(state),
    topCardInDiscard: selectTopCardInDiscard(state)
  }));

  return (
    <>
      <Typography>Five Crowns</Typography>
      <Typography>Current Round: {currentRound}</Typography>
      <Typography>Dealer: {dealerIdx}</Typography>
      <Typography>Current Turn: {turnIdx}</Typography>
      <Button>{topCardInDiscard.value} of {topCardInDiscard.suit} ({topCardInDiscard.id})</Button>
      <Button>Deck</Button>
      <List>
        {hand.map(card => (
          <ListItem key={card.id}>
            <ListItemText>{card.value} of {card.suit}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
}