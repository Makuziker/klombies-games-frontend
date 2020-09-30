import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import { Input, Button, Divider, List, ListItem, ListItemText, Typography, Box } from '@material-ui/core'

import Message from './Message'

const MessageBoard = ({ name, room, messages, message, setMessage, sendMessage, users }) => (
  <Box>
    <Typography>Users in the Room:</Typography>
    <List>
      {users.map((user, i) => (
        <ListItem key={i}>
          <ListItemText>{user.name}</ListItemText>
        </ListItem>
      ))}
    </List>
    <Divider />
    <ScrollToBottom>
      {messages.map((message, i) => (
        <Message key={i} message={message} name={name} />
      ))}
    </ScrollToBottom>
    <Box>
      <Input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyPress={e => (e.key === 'Enter' && message !== '') ? sendMessage(e) : null} />
      <Button
        variant="contained"
        type="submit"
        disabled={message === ''}
        onClick={e => sendMessage(e)}>
        Send
    </Button>
    </Box>
  </Box>
)

export default MessageBoard
