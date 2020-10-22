import React, { useCallback } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Divider, Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { MessageBoardUsers } from './Users';
import { Message } from './Message';
import { MessageInput } from './Input';
import { IMessage } from '../../types';
import { useAppSelectors } from '../../store';
import { IApplicationState } from '../../store/types';
import { apiAddMessage } from '../../store/api'
import { IUser } from '../../types'

export function ChatContent() {
  const users: IUser[] = []
  const messages: IMessage[] = []

  const { selectDisplayName } = useAppSelectors();

  const { displayName } = useSelector((state: IApplicationState) => ({
    displayName: selectDisplayName(state)
  }));

  const dispatch = useDispatch();

  const onInputSubmit = useCallback((text) => {
    // dispatch(apiAddMessage({ }))
  }, [dispatch]);

  return (
    <Box>
      <MessageBoardUsers users={users} />
      <Divider />
      <ScrollToBottom>
        {messages.map(message => (
          <Message key={message.id} message={message} name={displayName ?? ''} />
        ))}
      </ScrollToBottom>
      <MessageInput onSubmit={onInputSubmit} />
    </Box>
  );
}
