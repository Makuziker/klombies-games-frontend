import React, { useCallback } from 'react';
import { Typography, Grid, makeStyles } from '@material-ui/core';

import { ICard } from '../../store';
import { PlayingCard } from '../PlayingCard';

export interface ICardGroupProps {
  stagedGroups: ICard[][];
  validGroups: ICard[][];
}

const useStyles = makeStyles(({ spacing }) => ({
  groupContainer: {
    boxShadow: '4px 4px 8px #ddd',
    border: '1px solid #ccc',
    minHeight: spacing(8)
  },
  group: {
    padding: spacing(1),
    width: 'auto'
  }
}));

export const CardGroups = ({ stagedGroups, validGroups }: ICardGroupProps) => {
  const classes = useStyles();

  const selectGroups = useCallback(
    () => validGroups.length ? validGroups : stagedGroups,
    [validGroups, stagedGroups]
  );

  return (
    <Grid container justify="center" className={classes.groupContainer}>
      <Typography align="center" variant="subtitle1">Your Groups</Typography>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        {selectGroups().map((group, i) => (
          <Grid
            item
            key={i}
            container
            justify="center"
            alignItems="center"
            className={classes.group}
          >
            {group.map((card) => (
              <PlayingCard
                key={card.id}
                card={card}
                isDisabled={true}
                isSelected={false}
                onCardSelect={() => { }}
              />
            ))}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}