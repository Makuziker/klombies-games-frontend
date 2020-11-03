import { STATE_KEY_MAIN, STATE_KEY_PROCESSING, STATE_KEY_GAME } from './constants';
import { IMainState } from './main';
import { IProcessingState } from './processing';
import { IGameState } from './game';

export interface IApplicationState {
  [STATE_KEY_PROCESSING]: IProcessingState;
  [STATE_KEY_MAIN]: IMainState;
  [STATE_KEY_GAME]: IGameState;
}