export interface ILoadNetworkResourceError {
  message: string;
  code?: string;
}

export interface ILoadNetworkResourceState {
  loadingResource: boolean;
  loadedResource: boolean;
  loadingResourceError?: ILoadNetworkResourceError;
}

export const initialState: ILoadNetworkResourceState = {
  loadingResource: false,
  loadedResource: false
};

// selectors
export const selectIsLoadingResource = (state: ILoadNetworkResourceState) => state.loadingResource;
export const selectHasResourceLoaded = (state: ILoadNetworkResourceState) => state.loadedResource;
export const selectLoadResourceErrors = (state: ILoadNetworkResourceState) =>
  state.loadingResourceError;

// reducers
export function loadResource<T extends ILoadNetworkResourceState = ILoadNetworkResourceState>(
  state: T
) {
  return {
    ...state,
    loadingResource: true,
    loadingResourceError: undefined
  };
}

export function loadResourceSuccess<
  T extends ILoadNetworkResourceState = ILoadNetworkResourceState
>(state: T) {
  return {
    ...state,
    loadedResource: true,
    loadingResource: false,
    loadingResourceError: undefined
  };
}

export function loadResourceError<T extends ILoadNetworkResourceState = ILoadNetworkResourceState>(
  state: T,
  error: ILoadNetworkResourceError
) {
  return {
    ...state,
    loadingResource: false,
    loadedResource: false,
    loadingResourceError: error
  };
}
