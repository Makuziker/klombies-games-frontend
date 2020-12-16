import { ROUTES } from '../constants';
import { getRoutePath } from '../services';

export function useRoute() {
  return {
    home: ROUTES.home,
    auth: ROUTES.auth,
    room: ({ id, name }: { id: string; name: string; }) => getRoutePath('room', { name }, { id }),
    game: ({ id, name }: { id: string; name: string; }) => getRoutePath('game', { name }, { id }),
  }
}