import { Typography, List, ListItem, ListItemText, Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { IUser } from '../../types';
import { IPlayers, IPlayer } from '../../store';

export interface IMessageBoardUsersProps {
  users: IUser[];
  players: IPlayers;
  isGameInSession: boolean;
}

export function MessageBoardUsers({ users, players, isGameInSession }: IMessageBoardUsersProps) {
  const renderReadyToStart = (user: IUser) => user.readyToStart ? 'Ready!' : 'Not Ready';
  const renderPlayerScore = (player: IPlayer) => `Score: ${player?.score}`;

  const renderUserDetails = (user: IUser) => {
    if (isGameInSession) return renderPlayerScore(players[user.id]);
    return renderReadyToStart(user);
  }

  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Users in the Room:</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {users.map((user) => (
            <ListItem key={user.id}>
              <ListItemText>
                {user.name} - {renderUserDetails(user)}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}