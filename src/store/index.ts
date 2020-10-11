import { STATE_KEY_PROCESSING } from './constants';
import { processingReducer, useProcesingSelectors } from './processing';

export * from './processing';
export * from './utils/networkResource';

export const reducers = {
  [STATE_KEY_PROCESSING]: processingReducer
};

export const useAppSelectors = () => {
  return {
    ...useProcesingSelectors(),
  };
};

