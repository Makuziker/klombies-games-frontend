import React, { useEffect, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { getSession } from '../services';
import { userLoggedIn } from '../store';

export interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const dispatch = useDispatch();

  // check for existing valid session
  useEffect(() => {
    getSession()
      .then(session => {
        if (session.isValid()) {
          dispatch(userLoggedIn({ data: session }));
        }
      })
  }, [dispatch]);

  return (
    <>
      {children}
    </>
  );
}