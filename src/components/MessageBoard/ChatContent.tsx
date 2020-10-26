import React, { useCallback } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Divider, Box, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { MessageBoardUsers } from './Users';
import { Message } from './Message';
import { MessageInput } from './Input';
import { useAppSelectors, findUserById, apiAddMessage } from '../../store';
import { IApplicationState } from '../../store/types';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  users: {
    position: 'sticky',
  },
  messages: {
    display: 'flex',
    flexGrow: 1 // make the frikin messages fill up the space
  }
}));

export function ChatContent() {
  const classes = useStyles();

  const { selectDisplayName, selectUsersInRoom, selectMessages } = useAppSelectors();

  const { displayName } = useSelector((state: IApplicationState) => ({
    displayName: selectDisplayName(state)
  }));

  const { usersInRoom } = useSelector((state: IApplicationState) => ({
    usersInRoom: selectUsersInRoom(state)
  }));

  const { messages } = useSelector((state: IApplicationState) => ({
    messages: selectMessages(state)
  }));

  const dispatch = useDispatch();

  const onInputSubmit = useCallback((text) => {
    dispatch(apiAddMessage({
      text,
      owner: findUserById(usersInRoom || [])
    }))
  }, [dispatch, usersInRoom]);

  return (
    <Box className={classes.root}>
      <div className={classes.users}>
        <MessageBoardUsers users={usersInRoom || []} />
      </div>
      <Divider />
      <ScrollToBottom className={classes.messages}>
        {messages ? messages.map(message => (
          <Message key={message.id} message={message} userName={displayName || ''} />
        )) : null}
      </ScrollToBottom>
      <MessageInput onSubmit={onInputSubmit} />
    </Box>
  );
}
