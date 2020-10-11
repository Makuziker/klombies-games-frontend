import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider, ThemeOptions, createMuiTheme } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import createStore from './store/createStore';

interface IBootApp {
  theme?: ThemeOptions;
  children: ReactNode;
}

export default function BootApp({ children, theme = createMuiTheme() }: IBootApp) {
  // const store = createStore(reducers, sagas);
  const store = createStore();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          {children}
        </MuiThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}
