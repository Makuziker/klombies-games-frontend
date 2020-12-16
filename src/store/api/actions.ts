import { createAction } from '@reduxjs/toolkit';
import { ACTION } from './constants';
import {
  IJoinProps,
  INewMessageProps,
  IDiscardFromHandProps,
  IGoOutProps,
  ILayDownCardsProps,
  ISignUpProps,
  ILoginProps
} from '../../services';

export const apiConnect = createAction(ACTION.CONNECT);
export const apiDisconnect = createAction(ACTION.DISCONNECT);

export const apiSignUp = createAction<ISignUpProps>(ACTION.SIGN_UP);
export const apiLogin = createAction<ILoginProps>(ACTION.LOGIN);
export const apiLogout = createAction(ACTION.LOGOUT);

export const apiJoinRoom = createAction<IJoinProps>(ACTION.JOIN_ROOM);

export const apiAddMessage = createAction<INewMessageProps>(ACTION.MESSAGE);

export const apiReadyToStart = createAction(ACTION.READY_TO_START);

export const apiDrawFromDeck = createAction(ACTION.DRAW_FROM_DECK);
export const apiDrawFromDiscard = createAction(ACTION.DRAW_FROM_DISCARD);
export const apiDiscardFromHand = createAction<IDiscardFromHandProps>(ACTION.DISCARD_FROM_HAND);
export const apiGoOut = createAction<IGoOutProps>(ACTION.GO_OUT);
export const apiLayDownCards = createAction<ILayDownCardsProps>(ACTION.LAY_DOWN_CARDS);
