import { IUser } from '../types';
import { ICard } from '../store';

export type ICallback<R extends {} = {}> = (payload: { error?: string; request?: R; }) => void;

export interface ISignUpProps {
  email: string;
  name: string;
  password: string;
}

export interface ILoginProps {
  email: string;
  password: string;
}

export interface IJoinProps {
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