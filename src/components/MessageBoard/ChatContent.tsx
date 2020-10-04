import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import { Divider, Box } from '@material-ui/core'

import { Message } from './Message'
import { MessageInput, IMessageInputProps } from './Input';
import { MessageBoardUsers, IMessageBoardUsersProps } from './Users';
import { IMessage } from '../../types';

export interface IChatContentProps extends IMessageBoardUsersProps {
  name: string;
  messages: IMessage[];
  inputValue: string;
  onInputChange: IMessageInputProps['onChange'];
  onInputSubmit: IMessageInputProps['onSubmit'];
}

export function ChatContent({
  name,
  messages,
  inputValue,
  users,
  onInputChange,
  onInputSubmit
}: IChatContentProps) {
  return (
    <Box>
      <MessageBoardUsers users={users} />
      <Divider />
      <ScrollToBottom>
        {messages.map((message, i) => (
          // TODO Should use the message id instead of index.
          <Message key={message.id ?? i} message={message} name={name} />
        ))}
      </ScrollToBottom>
      <MessageInput value={inputValue} onSubmit={onInputSubmit} onChange={onInputChange} />
    </Box>
  );
}
