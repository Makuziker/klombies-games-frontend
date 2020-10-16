export interface IMainState {
  displayName?: string;
  roomCode?: string;
}

// Matches `backend/src/socket/types.ts`
export interface ICurrentUserJoinRoomData {
  user: {
    id: string;
    name: string;
    room: string;
    readyToStart: boolean;
  };
}
