import React from 'react';
import { Drawer, makeStyles, Toolbar } from '@material-ui/core';
import { ChatContent } from './ChatContent';

export interface IChatPanelProps {
  open: boolean;
}

const drawerWidth = 340;

const useStyles = makeStyles(({ spacing }) => ({
  drawerPaper: {
    width: drawerWidth,
    padding: spacing(1)
  },
}));

export function ChatPanel({ open }: IChatPanelProps) {
  const classes = useStyles();

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      {/* Move content under navbar */}
      <Toolbar />
      <ChatContent />
    </Drawer>
  );
}