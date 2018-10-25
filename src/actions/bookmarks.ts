import { AnyAction } from 'redux';

export const ADD_BOOKMARK = 'aiana/ADD_BOOKMARK';

export function addBookmark(time: number): AnyAction {
  return {
    time,
    type: ADD_BOOKMARK
  };
}
