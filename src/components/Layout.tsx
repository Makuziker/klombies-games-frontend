import { makeStyles, Toolbar } from '@material-ui/core';
import React, { ReactNode } from 'react';
import Navbar from '../containers/NavBar';

export interface ILayoutProps {
  children: ReactNode;
}

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    display: 'flex'
  },
  content: {
    padding: spacing(2)
  }
}))

export function Layout({ children }: ILayoutProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.content}>
        <Toolbar />
        {children}
      </div>
    </div>
  );
}
