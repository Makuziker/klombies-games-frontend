import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { STATE_KEY_PROCESSING } from '../constants';
import { IProcessingState, IProcessingStateProps } from './types';
import {
  initialState as networkInitialState,
  selectIsLoadingResource,
  loadResource,
  loadResourceError,
  loadResourceSuccess,
  ILoadNetworkResourceError
} from '../utils/networkResource';

export type PROCESSING_STATE_SLICE = { [STATE_KEY_PROCESSING]: IProcessingState };

const initialState: IProcessingState = networkInitialState;

// Selectors
const labelSelector = (state: PROCESSING_STATE_SLICE) => state[STATE_KEY_PROCESSING].label;
const labelIdSelector = (state: PROCESSING_STATE_SLICE) => state[STATE_KEY_PROCESSING].labelId;
const sliceSelector = (state: PROCESSING_STATE_SLICE) => state[STATE_KEY_PROCESSING];

export const selectProcessingLabel = () =>
  createSelector(labelIdSelector, labelSelector, (labelId, label) => ({
    label,
    labelId,
  }));

export const selectIsProcessing = () =>
  createSelector(sliceSelector, slice => selectIsLoadingResource(slice));

export const useProcesingSelectors = () => ({
  selectProcessingLabel: useMemo(selectProcessingLabel, []),
  selectIsProcessing: useMemo(selectIsProcessing, [])
});

// Slice
export const processingSlice = createSlice({
  initialState,
  name: STATE_KEY_PROCESSING,
  reducers: {
    setLabelInfo(state, { payload }: PayloadAction<IProcessingStateProps>) {
      return {
        ...state,
        ...payload
      };
    },
    setLoadResource(state) {
      return loadResource(state);
    },
    setLoadResourceSuccess(state) {
      return loadResourceSuccess(state);
    },
    setLoadResourceError(state, { payload }: PayloadAction<ILoadNetworkResourceError>) {
      return loadResourceError(state, payload);
    }
  }
});

export const { reducer: processingReducer } = processingSlice;
export const {
  setLabelInfo,
  setLoadResource,
  setLoadResourceError,
  setLoadResourceSuccess
} = processingSlice.actions;
export * from './types';
