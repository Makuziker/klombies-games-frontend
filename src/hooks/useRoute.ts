import { ROUTES } from '../constants';
import { getRoutePath } from '../services';

export function useRoute() {
  return {
    home: ROUTES.home,
    auth: ROUTES.auth,
    room: ({ id }: { id: string; }) => getRoutePath('room', undefined, { id }),
    game: ({ id }: { id: string; }) => getRoutePath('game', undefined, { id }),
  }
}