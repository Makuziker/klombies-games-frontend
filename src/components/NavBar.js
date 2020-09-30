import React from 'react'
import { AppBar, Toolbar, Badge, Button } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import ForumIcon from '@material-ui/icons/Forum';

const NavBar = ({ toggleMessageBoard }) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography color="inherit">
            Klombies Games
          </Typography>
          {toggleMessageBoard
            ? <Button onClick={e => toggleMessageBoard(e)}>
                <Badge color="secondary" variant="dot">
                  <ForumIcon />
                </Badge>
              </Button>
            : null}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar;