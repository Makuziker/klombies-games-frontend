import { socket } from '../constants';
import { ACTION } from '../store';
import {
  ICallback,
  IJoinProps,
  INewMessageProps,
  IDiscardFromHandProps,
  IGoOutProps,
  ILayDownCardsProps,
} from './types';

/**
 * This file handles the request made to the server.
 * For listening for responses from the server, see `providers/ApiProvider.tsx`
 */

const callback: ICallback = ({ error, request }) => {
  if (error) {
    console.error(error, request);
  }
}

export function connect() {
  socket.connect();
  console.log('Web socket opened');
}

export function disconnect() {
  console.log('Web socket closed');
  socket.emit('disconnect');
  socket.disconnect();
}

export function join({ room }: IJoinProps) {
  socket.emit(ACTION.JOIN_ROOM, { room }, callback);
  return () => {
    socket.emit('disconnect');
  }
}

export function sendMessage({ text, owner }: INewMessageProps) {
  socket.emit(ACTION.MESSAGE, { text, owner }, callback);
  return () => {
    socket.emit('disconnect');
  }
}

export function readyToStart() {
  socket.emit(ACTION.READY_TO_START, callback);
  return () => {
    socket.emit('disconnect');
  }
}

export function drawFromDeck() {
  socket.emit(ACTION.DRAW_FROM_DECK, callback);
  return () => {
    socket.emit('disconnect');
  }
}

export function drawFromDiscard() {
  socket.emit(ACTION.DRAW_FROM_DISCARD, callback);
  return () => {
    socket.emit('disconnect');
  }
}

export function discardFromHand({ card }: IDiscardFromHandProps) {
  socket.emit(ACTION.DISCARD_FROM_HAND, { card }, callback);
  return () => {
    socket.emit('disconnect');
  }
}

export function goOut({ groups, discard }: IGoOutProps) {
  socket.emit(ACTION.GO_OUT, { groups, discard }, callback);
  return () => {
    socket.emit('disconnect');
  }
}

export function layDownCards({ groups, discard }: ILayDownCardsProps) {
  socket.emit(ACTION.LAY_DOWN_CARDS, { groups, discard }, callback);
  return () => {
    socket.emit('disconnect');
  }
}