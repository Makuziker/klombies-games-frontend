import { useEffect } from 'react';
import { socket } from '../constants';

export function useSocket<TData extends {} = {}>(event: string, callback: (data: TData) => void) {
  useEffect(() => {
    socket.on(event, callback);
    return () => {
      socket.disconnect();
    }
  });
}