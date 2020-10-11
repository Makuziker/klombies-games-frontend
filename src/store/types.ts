import { STATE_KEY_MAIN, STATE_KEY_PROCESSING } from './constants';
import { IMainState } from './main';
import { IProcessingState } from './processing';

export interface IApplicationState {
  [STATE_KEY_PROCESSING]: IProcessingState;
  [STATE_KEY_MAIN]: IMainState;
}