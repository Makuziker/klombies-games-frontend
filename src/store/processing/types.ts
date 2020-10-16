import { ILoadNetworkResourceState } from '../utils/networkResource';

export interface IProcessingStateProps {
  label?: string;
  labelId?: string;
}

export interface IProcessingState extends ILoadNetworkResourceState, IProcessingStateProps {}
