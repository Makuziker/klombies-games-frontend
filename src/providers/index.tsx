import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider, ThemeOptions, createMuiTheme } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import createStore from '../store/createStore';
import { ApiProvider } from './ApiProvider';

export interface IProvidersProps {
  theme?: ThemeOptions;
  children: ReactNode;
}

export function Providers({ children, theme = createMuiTheme() }: IProvidersProps) {
  const store = createStore();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <ApiProvider>
            {children}
          </ApiProvider>
        </MuiThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}
