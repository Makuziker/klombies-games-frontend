import React, { useMemo } from 'react'
import { IMessage } from '../../types';
import { emojify } from 'node-emoji';
import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg'

export interface IMessageProps {
  message: IMessage;
  name: string;
}

export function Message({ message: { owner, text }, name }: IMessageProps) {
  const trimmedName = useMemo(() => name.trim().toLowerCase(), [name]);
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
  )
}


// const Message = ({ message: { user, text }, name }) => {
//   let isSentByCurrentUser = false
//   const trimmedName = name.trim().toLowerCase()

//   if (user === trimmedName) isSentByCurrentUser = true

//   return (
//     isSentByCurrentUser
//       ? (
//         <ChatMsg side={'right'} messages={[emojify(text)]} />
//       ) : (
//         <ChatMsg messages={[`${user}: ${emojify(text)}`]} />
//       )
//   )
// }

// export default Message

