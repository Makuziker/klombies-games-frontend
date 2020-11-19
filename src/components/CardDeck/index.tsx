import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { ICard } from '../../store';
import { PlayingCard } from '../PlayingCard';

export interface ICardDeckProps {
  topCardInDiscard?: ICard;
  onDrawFromDeck: () => void;
  onDrawFromDiscard: () => void;
  playerMayDraw: boolean;
}

const useStyles = makeStyles(({ spacing }) => ({
  card: {
    padding: spacing(1)
  }
}));

export function CardDeck({
  topCardInDiscard,
  onDrawFromDeck,
  onDrawFromDiscard,
  playerMayDraw
}: ICardDeckProps) {
  const classes = useStyles();
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item className={classes.card}>
        <Typography variant="subtitle2" align="center">Discard</Typography>
        <PlayingCard
          card={topCardInDiscard}
          isDisabled={!playerMayDraw || !topCardInDiscard}
          isSelected={false}
          isEmpty={!topCardInDiscard}
          onCardSelect={onDrawFromDiscard}
        />
      </Grid>
      <Grid item className={classes.card}>
        <Typography variant="subtitle2" align="center">Deck</Typography>
        <PlayingCard
          isDisabled={!playerMayDraw}
          isSelected={false}
          onCardSelect={onDrawFromDeck}
        />
      </Grid>
    </Grid>
  );
}