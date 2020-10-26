import { IUser, IMessage } from '../../types';

export interface IMainState {
  displayName?: string;
  roomCode?: string;
  usersInRoom?: IUser[];
  messages?: IMessage[];
}

// Matches `backend/src/socket/types.ts`
export interface ICurrentUserJoinRoomData {
  user: IUser;
}

export interface IUsersInRoomData {
  usersInRoom: IUser[];
}

export interface IMessageData {
  id: string;
  owner: IUser;
  text: string;
}
