import React from 'react';
import { List, ListItem, ListItemText, Typography, makeStyles } from '@material-ui/core';

import { socket } from '../../constants';
import { IUser } from '../../types';

export interface IPlayerQueueProps {
  players: IUser[];
  turnIdx: number;
  dealerIdx: number;
  isCurrentPlayersTurn: boolean;
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexGrow: 1
  },
  active: {
    background: 'green'
  }
}));

export function PlayerQueue({ players, turnIdx, dealerIdx, isCurrentPlayersTurn }: IPlayerQueueProps) {
  const classes = useStyles();

  return (
    <>
      <List className={classes.root}>
        {players.map((player, idx) => {
          return (
            <ListItem key={player.id} className={`${idx === turnIdx ? classes.active : ''}`}>
              <ListItemText>
                {`${player.id === socket.id ? 'You' : player.name}${idx === dealerIdx ? ' - Dealer' : ''}`}
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
      {isCurrentPlayersTurn && <Typography>Your Turn!</Typography>}
    </>
  );
}