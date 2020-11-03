import { STATE_KEY_GAME, STATE_KEY_MAIN, STATE_KEY_PROCESSING } from './constants';
import { gameReducer, useGameSelectors } from './game';
import { mainReducer, useMainSelectors } from './main';
import { processingReducer, useProcesingSelectors } from './processing';

export * from './processing';
export * from './main';
export * from './game';
export * from './api';
export * from './utils/networkResource';

export const reducers = {
  [STATE_KEY_PROCESSING]: processingReducer,
  [STATE_KEY_MAIN]: mainReducer,
  [STATE_KEY_GAME]: gameReducer
};

export const useAppSelectors = () => {
  return {
    ...useProcesingSelectors(),
    ...useMainSelectors(),
    ...useGameSelectors()
  };
};

