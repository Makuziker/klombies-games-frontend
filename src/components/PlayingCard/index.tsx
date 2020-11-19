import { ButtonBase, Grid, makeStyles } from '@material-ui/core';
import React, { useCallback } from 'react';
import { ICard } from '../../store';

export interface IPlayingCardProps {
  card?: ICard;
  isSelected: boolean;
  isDisabled: boolean;
  isEmpty?: boolean;
  onCardSelect: (card: ICard) => void;
}

const useStyles = makeStyles(({ spacing }) => ({
  cardContainer: {
    width: spacing(8),
    height: spacing(11),
    border: '1px solid #ddd',
    boxShadow: '2px 2px 4px #eee',
    fontSize: '11px'
  },
  cardSelected: {
    border: '2px solid orange'
  },
  cardDisabled: {
    background: '#edeeed'
  },
  cardEmpty: {

  },
  cardFaceDown: {

  },
  hearts: {
    color: '#ff1744'
  },
  spades: {
    color: '#000'
  },
  diamonds: {
    color: '#3f51b5'
  },
  clubs: {
    color: '#4caf50'
  },
  stars: {
    color: '#c1ab00'
  },
  joker: {
    color: '#5e35b1'
  },
  rank: {

  },
  suit: {

  },
}));

export const PlayingCard = ({
  card,
  isSelected,
  isDisabled,
  isEmpty,
  onCardSelect
}: IPlayingCardProps) => {
  const classes = useStyles();

  const generateSuitClass = useCallback(
    ({ suit }: ICard) => {
      switch (suit) {
        case 'CLUBS':
          return classes.clubs;
        case 'DIAMONDS':
          return classes.diamonds;
        case 'HEARTS':
          return classes.hearts;
        case 'SPADES':
          return classes.spades;
        case 'STARS':
          return classes.stars;
        default:
          return classes.joker;
      }
    }, [classes]
  );

  const generateCardClasses = useCallback(
    () => {
      const classArr = [classes.cardContainer];
      if (isSelected) classArr.push(classes.cardSelected);
      if (isDisabled) classArr.push(classes.cardDisabled);
      if (isEmpty) classArr.push(classes.cardEmpty);
      if (!card) classArr.push(classes.cardFaceDown);
      if (card) classArr.push(generateSuitClass(card));
      return classArr.join(' ');
    },
    [card, isSelected, isDisabled, isEmpty, classes, generateSuitClass]
  );

  return (
    <Grid item key={card?.id}>
      <ButtonBase
        className={generateCardClasses()}
        disabled={isDisabled}
        onClick={() => onCardSelect(card || { id: 'placeholder', suit: '', value: 'JOKER' })}
      >
        {card && `${card.value} ${card.suit}`}
      </ButtonBase>
    </Grid>

  );
}