export interface IMainState {
  displayName?: string;
  roomCode?: string;
}

export interface ICurrentUserJoinRoomData {
  user: {
    id: string;
    name: string;
    room: string;
    readyToStart: boolean;
  };
}
