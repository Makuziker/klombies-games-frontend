import React from 'react';
import { Button } from '@material-ui/core';
import { ICard } from '../../store';

export interface ICardDeckProps {
  topCardInDiscard?: ICard;
  onDrawFromDeck: () => void;
  onDrawFromDiscard: () => void;
  playerMayDraw: boolean;
}

export function CardDeck({
  topCardInDiscard,
  onDrawFromDeck,
  onDrawFromDiscard,
  playerMayDraw
}: ICardDeckProps) {
  return (
    <>
      <Button disabled={!playerMayDraw || !topCardInDiscard} onClick={onDrawFromDiscard}>
        {topCardInDiscard
          ? `${topCardInDiscard.value} of ${topCardInDiscard.suit}`
          : 'Discard Pile Empty'}
      </Button>
      <Button disabled={!playerMayDraw} onClick={onDrawFromDeck}>
        Deck
      </Button>
    </>
  );
}