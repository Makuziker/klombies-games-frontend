export interface IGameState {
  isGameInSession: boolean;
  currentRound: IRound;
  dealerIdx: number;
  turnIdx: number;
  topCardInDiscard?: ICard;
  playerList: string[];
  players: IPlayers;
  playerIdWhoWentOut: string | null;
  winnerId: IWinner;
}

export interface IPlayerHandData {
  hand: ICard[];
}

export interface ICard {
  id: string;
  value: 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'J' | 'Q' | 'K' | 'JOKER';
  suit: 'HEARTS' | 'DIAMONDS' | 'CLUBS' | 'STARS' | 'SPADES' | '';
}

export interface IPlayer {
  score: number;
  numGoneOut: number;
  hand: ICard[];
  groups: ICard[];
}

export interface IPlayers {
  [key: string]: IPlayer;
}

export type IRound = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type IWinner = null | string | string[];
