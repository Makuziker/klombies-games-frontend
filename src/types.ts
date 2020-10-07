export type IIdType = string | number;

export interface IUser {
  id?: IIdType; // TODO Ideally the model will have this
  name: string;
}

export interface IMessage {
  id?: IIdType; // TODO Ideally the model will have this
  owner: IUser;
  text: string;
}