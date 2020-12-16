import { Middleware } from '@reduxjs/toolkit';
import { IApplicationState } from '../types';
import { ACTION } from './constants';
import * as Api from '../../services';

/**
 * This will listen for any actions fired within redux, if any match the cases below
 * then these reducers will fire. Otherwise the default will be hit and redux will
 * continue to find the reducer in the slices.
 *
 * @param store Application store
 */
export const apiMiddleware: Middleware<{}, IApplicationState> = store => next => action => {
  switch (action.type) {
    case ACTION.CONNECT:
      Api.connect();
      break;
    case ACTION.DISCONNECT:
      Api.disconnect();
      break;
    case ACTION.SIGN_UP:
      Api.signUp(action.payload, store);
      break;
    case ACTION.LOGIN:
      Api.login(action.payload, store);
      break;
    case ACTION.LOGOUT:
      Api.logout();
      break;
    case ACTION.JOIN_ROOM:
      Api.join(action.payload);
      break;
    case ACTION.MESSAGE:
      Api.sendMessage(action.payload);
      break;
    case ACTION.READY_TO_START:
      Api.readyToStart();
      break;
    case ACTION.DRAW_FROM_DECK:
      Api.drawFromDeck();
      break;
    case ACTION.DRAW_FROM_DISCARD:
      Api.drawFromDiscard();
      break;
    case ACTION.DISCARD_FROM_HAND:
      Api.discardFromHand(action.payload);
      break;
    case ACTION.GO_OUT:
      Api.goOut(action.payload);
      break;
    case ACTION.LAY_DOWN_CARDS:
      Api.layDownCards(action.payload);
      break;
    default:
      return next(action);
  }
}
