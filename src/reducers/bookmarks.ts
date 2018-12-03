import { Reducer } from 'redux';
import { ADD_BOOKMARK } from 'src/actions/bookmarks';
import { LOAD_CONFIGURATION } from 'src/actions/shared';

export interface IBookmark {
  readonly time: number;
}

export type IBookmarksState = IBookmark[];

const bookmarks: Reducer = (state: IBookmarksState = [], action) => {
  switch (action.type) {
    case ADD_BOOKMARK:
      if (state.find((mark) => mark.time === action.time)) {
        return state;
      }
      return state.concat({ time: action.time });
    case LOAD_CONFIGURATION: {
      const { actionBookmarks = [] } = action;
      return state.concat(actionBookmarks);
    }
    default:
      return state;
  }
};

export default bookmarks;
