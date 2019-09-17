import { addBookmark } from '../actions/bookmarks';
import { loadConfiguration } from '../actions/shared/configuration';
import { createReducer } from 'redux-starter-kit';

export interface IBookmark {
  readonly time: number;
}

type IBookmarkState = IBookmark[];

function hasBookmarked(time: number, state: IBookmarkState): boolean {
  return state.some((b) => b.time === time);
}

export const bookmarksReducer = createReducer([] as any, {
  [addBookmark.type]: (state: IBookmarkState, action) => {
    const time = action.payload;

    if (!hasBookmarked(time, state)) {
      state.push({ time });
    }
  },
  [loadConfiguration.type]: (state: IBookmarkState, action) => {
    const { bookmarks = [] } = action.payload;
    return ([] as IBookmarkState).concat([...state], bookmarks);
  }
});

export default bookmarksReducer;
