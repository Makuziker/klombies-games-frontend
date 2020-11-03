import { Typography, List, ListItem, ListItemText, Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { IUser } from '../../types';

export interface IMessageBoardUsersProps {
  users: IUser[];
}

export function MessageBoardUsers({ users }: IMessageBoardUsersProps) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Users in the Room:</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {users.map((user) => (
            <ListItem key={user.id}>
              <ListItemText>
                {user.name} - {user.readyToStart ? 'Ready!' : 'Not Ready'}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}