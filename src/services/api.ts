import { socket } from '../constants';
import { ICard } from '../store';
import { ACTION } from '../store/api/constants';
import { IUser } from '../types';

/**
 * This file handles the request made to the server.
 * For listening for responses from the server, see `providers/ApiProvider.tsx`
 */

export type ICallback<R extends {} = {}> = (payload: { error?: string; request?: R; }) => void;

export interface IJoinProps {
  name: string;
  room: string;
}

export interface INewMessageProps {
  text: string;
  owner: IUser
}

export interface IDiscardFromHandProps {
  card: ICard;
}

export interface IGoOutProps {
  groups: ICard[][];
  discard: ICard;
}

export interface ILayDownCardsProps {
  groups: ICard[][];
  discard: ICard;
}

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

export function join({ name, room }: IJoinProps) {
  socket.emit(ACTION.JOIN_ROOM, { name, room }, callback);
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

export function layDownCards({groups, discard}: ILayDownCardsProps) {
  socket.emit(ACTION.LAY_DOWN_CARDS, { groups, discard }, callback);
  return () => {
    socket.emit('disconnect');
  }
}