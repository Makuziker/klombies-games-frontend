import React, { useMemo } from 'react';
import { IMessage } from '../../types';
import { emojify } from 'node-emoji';
import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';

export interface IMessageProps {
  message: IMessage;
  userName: string;
}

export function Message({ message: { owner, text }, userName }: IMessageProps) {
  const trimmedName = useMemo(() => userName.trim().toLowerCase(), [userName]); // should be sanitizing data way earlier?
  const isSentByUser = useMemo(() => owner.name === trimmedName, [owner.name, trimmedName]);
  const message = useMemo(() => {
    let msg = '';
    if (!isSentByUser) {
      msg += `${owner.name}: `;
    }
    return `${msg}${emojify(text)}`;
  }, [isSentByUser, owner.name, text]);

  return (
    <ChatMsg
      side={isSentByUser ? 'right' : 'left'}
      messages={[message]}
    />
  );
}
