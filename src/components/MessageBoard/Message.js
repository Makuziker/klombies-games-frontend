import React from 'react'
import { emojify } from 'react-emoji'
import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg'


const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false
  const trimmedName = name.trim().toLowerCase()

  if (user === trimmedName) isSentByCurrentUser = true

  return (
    isSentByCurrentUser
      ? (
        <ChatMsg side={'right'} messages={[emojify(text)]} />
      ) : (
        <ChatMsg messages={[`${user}: ${emojify(text)}`]} />
      )
  )
}

export default Message

