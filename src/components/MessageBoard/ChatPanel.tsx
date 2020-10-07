import React from 'react';
import { Drawer, makeStyles, Toolbar } from '@material-ui/core';
import { ChatContent, IChatContentProps } from './ChatContent';

export interface IChatPanelProps extends IChatContentProps {
  open: boolean;
}

const drawerWidth = 340;

const useStyles = makeStyles(({ spacing }) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    padding: spacing(1)
  },
}));

export function ChatPanel({ open, ...chatContentProps }: IChatPanelProps) {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      {/* Move content under navbar */}
      <Toolbar />
      <ChatContent {...chatContentProps} />
    </Drawer>
  )
}