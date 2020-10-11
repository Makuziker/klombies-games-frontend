import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { apiConnect, apiDisconnect } from '../store/api';

export interface IApiProviderProps {
  children: ReactNode;
}

export function ApiProvider({ children }: IApiProviderProps) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(apiConnect());
    return () => {
      dispatch(apiDisconnect());
    }
  }, [dispatch]);
  
  return <>{children}</>;
}