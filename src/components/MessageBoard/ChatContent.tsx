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
  container: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    height: '100%'
  },
  messages: {
    overflowY: 'auto',
    display: 'flex',
    flexGrow: 1
  }
}));

export function ChatContent() {
  const classes = useStyles();

  const {
    selectDisplayName,
    selectUsersInRoom,
    selectMessages,
    selectIsGameInSession,
    selectPlayers
  } = useAppSelectors();

  const {
    displayName,
    usersInRoom,
    messages,
    players,
    isGameInSession
  } = useSelector((state: IApplicationState) => ({
    displayName: selectDisplayName(state),
    usersInRoom: selectUsersInRoom(state),
    messages: selectMessages(state),
    players: selectPlayers(state),
    isGameInSession: selectIsGameInSession(state)
  }));

  const dispatch = useDispatch();

  const onInputSubmit = useCallback((text) => {
    dispatch(apiAddMessage({
      text,
      owner: findUserById(usersInRoom)
    }))
  }, [dispatch, usersInRoom]);

  return (
    <Box className={classes.container}>
      <MessageBoardUsers
        users={usersInRoom}
        players={players}
        isGameInSession={isGameInSession} />
      <Divider />
      <ScrollToBottom className={classes.messages}>
        {messages?.map(message => (
          <Message key={message.id} message={message} userName={displayName} />
        ))}
      </ScrollToBottom>
      <MessageInput onSubmit={onInputSubmit} />
    </Box>
  );
}
