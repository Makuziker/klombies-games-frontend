import { STATE_KEY_PROCESSING } from './constants';
import { IProcessingState } from './processing';

export interface IApplicationState {
  [STATE_KEY_PROCESSING]: IProcessingState;
}