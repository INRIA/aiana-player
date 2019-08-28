// import { IStdAction } from '../types';
import { createAction } from 'redux-starter-kit';

export const ADD_BOOKMARK = 'aiana/ADD_BOOKMARK';

export const addBookmark = createAction<number>(ADD_BOOKMARK);

// export function addBookmark(time: number): IStdAction {
//   return {
//     payload: {
//       time
//     },
//     type: ADD_BOOKMARK
//   };
// }
