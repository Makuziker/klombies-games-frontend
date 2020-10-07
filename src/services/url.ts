import { IRouteKey, ROUTES } from '../constants';

export function param(params: Record<string, string> = {}) {
  return Object
    .entries(params)
    .reduce(
      (str, [key, val]) => `${str}&${key}=${val}`,
      ''
    )
    .replace(/^&/, '');
}

export function getRoutePath(
  key: IRouteKey,
  params?: Record<string, string>,
  data: Record<string, string> = {}
) {
  const out = Object
    .entries(data)
    .reduce(
      (str, [k, v]) => str.replace(`:${k}`, v),
      ROUTES[key]
    );
  const p = param(params);
  return `${out}${p ? `?${p}` : ''}`;
}

export function deparam<U extends string>(qs: string) {
  // TODO this is a crude implementation. Allows letters, numbers, and dashes
  return qs
    .match(/[a-z0-9-]*=[a-z0-9-]*/gi)
    ?.map(match => match.split('='))
    .reduce(
      (obj, [key, val]) => ({ ...obj, [key]: val }),
      {} as Record<U, string>
    ) ?? {} as Record<U, string>;
}