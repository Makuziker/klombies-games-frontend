import { IUser } from '../../types'

export interface IMainState {
  displayName?: string;
  roomCode?: string;
  usersInRoom?: IUser[]
}

// Matches `backend/src/socket/types.ts`
export interface ICurrentUserJoinRoomData {
  user: IUser
}

export interface IUsersInRoomData {
  usersInRoom: IUser[]
}
