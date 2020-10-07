import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { IUser } from '../../types';

export interface IMessageBoardUsersProps {
  users: IUser[];
}

export function MessageBoardUsers({ users }: IMessageBoardUsersProps) {
  return (
    <>
      <Typography>Users in the Room:</Typography>
      <List>
        {users.map((user, i) => (
          <ListItem key={i}>
            <ListItemText>{user.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
}