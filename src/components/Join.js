import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Typography, Input, InputLabel, Button } from '@material-ui/core'
import NavBar from './NavBar'

const Join = () => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  const onSubmitHandler = e => (!room || !name) ? e.preventDefault() : null

  return (
    <>
      <NavBar />
      <Grid container>
        <Grid item xs={2} sm={4} />
        <Grid item xs={8} sm={4}>
          <Typography>Join a Room</Typography>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input type="text" onChange={e => setName(e.target.value)} />
          <InputLabel htmlFor="name">Room</InputLabel>
          <Input type="text" onChange={e => setRoom(e.target.value)} />
          <Link to={`/lobby?name=${name}&room=${room}`} onClick={e => onSubmitHandler(e)}>
            <Button variant="contained" type="submit" disabled={name === '' || room === ''}>Sign in</Button>
          </Link>
        </Grid>
        <Grid item xs={2} sm={4} />
      </Grid>
    </>
  )
}

export default Join
