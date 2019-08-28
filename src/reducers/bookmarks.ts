import { addBookmark } from '../actions/bookmarks';
import { loadConfiguration } from '../actions/shared';
import { createReducer } from 'redux-starter-kit';

export interface IBookmark {
  readonly time: number;
}

type IBookmarkState = IBookmark[];

function hasBookmark(time: number, state: IBookmarkState): boolean {
  return state.find((b) => b.time === time) ? true : false;
}

const bookmarksReducer = createReducer([], {
  [addBookmark.toString()]: (state: IBookmarkState, action) => {
    const { time } = action.payload;

    if (hasBookmark(time, state)) {
      return state;
    }

    return state.push({ time });
  },
  [loadConfiguration.toString()]: (state: IBookmarkState, action) => {
    return state.push(action.payload.bookmarks);
  }
});
// const bookmarks: Reducer<IBookmarkState, IStdAction> = (state = [], action) => {
//   switch (action.type) {
//     case ADD_BOOKMARK: {
//       if (hasBookmark(action.payload, state)) {
//         return state;
//       }
//       return ([] as IBookmark[]).concat(state, { time: action.payload });
//     }
//     case LOAD_CONFIGURATION: {
//       return ([] as IBookmark[]).concat(state, action.payload.bookmarks);
//     }
//     default:
//       return state;
//   }
// };

export default bookmarksReducer;
