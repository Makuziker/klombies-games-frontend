export interface IUser {
  id: string;
  name: string;
  room: string;
  readyToStart: boolean;
}

export interface IMessage {
  id: string;
  owner: IUser;
  text: string;
}