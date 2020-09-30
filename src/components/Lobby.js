import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import queryString from 'query-string'
import io from 'socket.io-client'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button'
import ForumIcon from '@material-ui/icons/Forum';
import Badge from '@material-ui/core/Badge';

import MessageBoard from './MessageBoard/MessageBoard'

/*** MUI EXAMPLE STYLES ***/

const drawerWidth = 340;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));


let socket

const Lobby = ({ location }) => {
  const ENDPOINT = 'localhost:8080'

  const classes = useStyles()
  const theme = useTheme()

  const [openDrawer, setOpenDrawer] = useState(true)
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [playingGame, setPlayingGame] = useState(false)
  const [gameState, setGameState] = useState({})
  const [hand, setHand] = useState([])
  const [groups, setGroups] = useState([])

  useEffect(() => {
    const { name, room } = queryString.parse(location.search)
    setName(name)
    setRoom(room)

    socket = io(ENDPOINT)
    socket.emit('join', { name, room }, error => {
      if (error) alert(error) // TODO ERROR HANDLING
    })

    return () => {
      socket.emit('disconnect')
      socket.off()
    }
  }, [ENDPOINT, location.search])

  useEffect(() => {
    socket.on('message', msg => {
      setMessages([...messages, msg])
    })
  }, [messages])

  useEffect(() => {
    socket.on('roomData', ({ users }) => {
      setUsers(users)
    })
  }, [users])

  useEffect(() => {
    socket.on('start game', (newGameState) => {
      setPlayingGame(true)
      setGameState(newGameState)
      console.log(newGameState)
    })
  }, [playingGame, gameState])

  useEffect(() => {
    socket.on('update player hand', (newHand) => {
      setHand(newHand) // confirm that client receives their new hand
      console.log(hand)
    })
  }, [hand])

  const sendMessage = event => {
    event.preventDefault()
    if (message) {
      socket.emit('sendMessage', message, error => {
        if (error) throw new Error(error)
        setMessage('')
      })
    }
  }

  const readyToStart = () => {
    socket.emit('ready to start', error => {
      if (error) throw new Error(error)
      // show 'Waiting for other players...'
    })
  }

  const handleDrawerOpen = () => {
    setOpenDrawer(true)
  }

  const handleDrawerClose = () => {
    setOpenDrawer(false)
  }

  const drawFromDeck = () => {
    socket.emit('draw from deck', error => {
      if (error) console.log(error)
    })
  }

  const drawFromDiscard = () => {
    socket.emit('draw from discard', error => {
      if (error) console.log(error)
    })
  }

  const discardFromHand = (card) => {

  }

  const goOut = () => {

  }

  // RIPPED FROM MUI EXAMPLE JSX
  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })}
      >
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            {room}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(openDrawer && classes.hide)}
          >
            <Badge color="secondary" variant="dot">
              <ForumIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: openDrawer,
        })}
      >
        <div className={classes.drawerHeader} />
        {playingGame
          ? <>
              <Button onClick={() => drawFromDiscard()}>Draw from Discard</Button>
              <Button onClick={() => drawFromDeck()}>Draw from Deck</Button>
              <Button onClick={() => goOut()}>Go Out</Button>
            </>
          : <>
              <Typography paragraph>
                Select a game. All members must select the same game to begin playing.
              </Typography>
              <Button onClick={() => readyToStart()}>Five Crowns</Button>
            </>
        }
      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={openDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <MessageBoard
          name={name}
          room={room}
          messages={messages}
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          users={users}
        />
      </Drawer>
    </div>
  )
}

export default Lobby