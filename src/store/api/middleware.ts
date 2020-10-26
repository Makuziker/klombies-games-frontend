import { Middleware } from '@reduxjs/toolkit';
import { IApplicationState } from '../types';
import { ACTION } from './constants';
import * as Api from '../../services/api';

/**
 * This will listen for any actions fired within redux, if any match the cases below
 * then these reducers will fire. Otherwise the default will be hit and redux will
 * continue to find the reducer in the slices.
 *
 * @param store Application store
 */
export const SocketMiddleware: Middleware<{}, IApplicationState> = store => next => action => {
  switch (action.type) {
    case ACTION.CONNECT:
      Api.connect();
      break;
    case ACTION.DISCONNECT:
      Api.disconnect();
      break;
    case ACTION.JOIN_ROOM:
      Api.join(action.payload);
      break;
    case ACTION.MESSAGE:
      Api.sendMessage(action.payload);
      break;
    default:
      return next(action);
  }
}
