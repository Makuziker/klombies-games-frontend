import React, { useCallback } from 'react';
import { List, ListItem, Typography, makeStyles } from '@material-ui/core';

import { socket } from '../../constants';
import { IUser } from '../../types';

export interface IPlayerQueueProps {
  players: IUser[];
  turnIdx: number;
  dealerIdx: number;
  isCurrentPlayersTurn: boolean;
  playerIdWhoWentOut: string | null;
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    boxShadow: '4px 4px 8px #ccc',
    padding: 0,
    [breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  },
  item: {
    justifyContent: 'center',
    border: '1px solid #ccc'
  },
  active: {
    background: '#c8b7d6'
  },
  wentOut: {
    background: '#ffcb2e'
  }
}));

export function PlayerQueue({
  players,
  turnIdx,
  dealerIdx,
  isCurrentPlayersTurn,
  playerIdWhoWentOut
}: IPlayerQueueProps) {
  const classes = useStyles();

  const renderQueueItemText = useCallback(
    (player: IUser, idx: number) => {
      const dealerStr = idx === dealerIdx ? ' (Dealer)' : ''
      const wentOutStr = playerIdWhoWentOut && player.id === playerIdWhoWentOut ? ' went out!' : '';
      if (player.id === socket.id) {
        return isCurrentPlayersTurn ? `Your turn${dealerStr}` : `You${wentOutStr}${dealerStr}`;
      }
      return `${player.name}${idx === turnIdx ? '\'s turn' : ''}${wentOutStr}${dealerStr}`;
    },
    [dealerIdx, turnIdx, isCurrentPlayersTurn, playerIdWhoWentOut]
  );

  const renderItemClasses = useCallback(
    (player: IUser, idx: number) => {
      const itemClasses = [classes.item];
      if (idx === turnIdx) itemClasses.push(classes.active);
      if (playerIdWhoWentOut && player.id === playerIdWhoWentOut) itemClasses.push(classes.wentOut);
      return itemClasses.join(' ');
    },
    [classes, turnIdx, playerIdWhoWentOut]
  );

  return (
    <>
      <List className={classes.root}>
        {players.map((player, idx) => {
          return (
            <ListItem key={player.id} className={renderItemClasses(player, idx)}>
              <Typography align='center' component='h6' variant='h6'>
                {renderQueueItemText(player, idx)}
              </Typography>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}