import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { difference, clone } from 'ramda';

import { ICard } from '../../store';
import { PlayingCard } from '../PlayingCard';

export interface ICardHandProps {
  hand: ICard[];
  playerMayDiscard: boolean;
  onCardSelect: (card: ICard) => void;
  isCardSelected: (card: ICard) => boolean;
  isCardGrouped: (card: ICard) => boolean;
}

const useStyles = makeStyles(({ spacing }) => ({
  handContainer: {
    boxShadow: '4px 4px 8px #ddd',
    border: '1px solid #ccc',
    minHeight: spacing(8)
  }
}));

export function CardHand({
  hand,
  playerMayDiscard,
  onCardSelect,
  isCardGrouped,
  isCardSelected
}: ICardHandProps) {
  const classes = useStyles();
  const [organizedHand, setOrganizedHand] = useState(hand);
  const [dragging, setDragging] = useState(false);
  const dragItem = useRef<ICard | null>();
  const dragNode = useRef<EventTarget | null>();

  useEffect(() => {
    setOrganizedHand(prevHand => {
      if (!hand.length || !prevHand.length) return hand;
      const newCards = difference(hand, prevHand);
      const removedCards = difference(prevHand, hand);
      return prevHand
        .filter(card => removedCards.every(c => c.id !== card.id))
        .concat(newCards);
    });
  }, [hand]);

  const handleDragEnter = useCallback((e: React.DragEvent, card: ICard) => {
    e.preventDefault();
    const currentCard = dragItem.current;
    if (e.target !== dragNode.current && currentCard && currentCard.id !== card.id) {
      setOrganizedHand(oldHand => {
        const newHand = clone(oldHand);
        newHand.splice(
          newHand.findIndex(c => c.id === card.id),
          0,
          newHand.splice(newHand.findIndex(c => c.id === currentCard.id), 1)[0]
        );
        return newHand;
      });
    }
  }, [dragItem]);

  const handleDragEnd = useCallback(() => {
    if (dragNode.current) {
      dragNode.current.removeEventListener('dragend', handleDragEnd);
    }
    dragItem.current = null;
    dragNode.current = null;
    setDragging(false);
  }, [dragNode]);

  const handleDragStart = useCallback((e: React.DragEvent, card: ICard) => {
    dragItem.current = card;
    dragNode.current = e.target;
    dragNode.current.addEventListener('dragend', handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  }, [dragItem, handleDragEnd]);

  return (
    <Grid container justify="center" className={classes.handContainer}>
      <Typography align="center" variant="subtitle1">Your Hand</Typography>
      <Grid item container direction="row" justify="center" alignItems="center">
        {organizedHand.map(card => (
          <div
            key={card.id}
            draggable
            onDragStart={(e) => handleDragStart(e, card)}
            onDragEnter={(e) => dragging && handleDragEnter(e, card)}
            onDragOver={(e) => e.preventDefault()}
          >
            <PlayingCard
              key={card.id}
              card={card}
              isDisabled={!playerMayDiscard}
              isEmpty={isCardGrouped(card)}
              isSelected={isCardSelected(card)}
              onCardSelect={onCardSelect}
            />
          </div>
        ))}
      </Grid>
    </Grid>
  );
}