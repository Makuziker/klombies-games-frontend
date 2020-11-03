import { ROUTES } from '../constants';
import { getRoutePath } from '../services/url';

export function useRoute() {
  return {
    home: ROUTES.home,
    room: ({ id, name }: { id: string; name: string; }) => getRoutePath('room', { name }, { id }),
    game: ({ id, name }: { id: string; name: string; }) => getRoutePath('game', { name }, { id }),
  }
}