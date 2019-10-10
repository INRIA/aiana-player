import queryString from 'query-string';
import { IQueryString } from '../types';

export function getUserId() {
  const parsedQueryString: IQueryString = queryString.parse(
    window.location.search
  );

  const { uid } = parsedQueryString;

  if (uid) {
    return uid;
  }

  return null;
}
