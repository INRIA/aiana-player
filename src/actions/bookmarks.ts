import { IStdAction } from '../types';

export const ADD_BOOKMARK = 'aiana/ADD_BOOKMARK';

export function addBookmark(time: number): IStdAction {
  return {
    payload: {
      time
    },
    type: ADD_BOOKMARK
  };
}
