import { STATE_KEY_MAIN, STATE_KEY_PROCESSING } from './constants';
import { mainReducer, useMainSelectors } from './main';
import { processingReducer, useProcesingSelectors } from './processing';

export * from './processing';
export * from './main';
export * from './api';
export * from './utils/networkResource';

export const reducers = {
  [STATE_KEY_PROCESSING]: processingReducer,
  [STATE_KEY_MAIN]: mainReducer
};

export const useAppSelectors = () => {
  return {
    ...useProcesingSelectors(),
    ...useMainSelectors(),
  };
};

