import { Reducer } from 'redux';
import { ADD_BOOKMARK } from '../actions/bookmarks';
import { LOAD_CONFIGURATION } from '../actions/shared';

export interface IBookmark {
  readonly time: number;
}

const bookmarks: Reducer = (state: IBookmark[] = [], action) => {
  switch (action.type) {
    case ADD_BOOKMARK:
      if (state.find((mark) => mark.time === action.time)) {
        return state;
      }
      return state.concat({ time: action.time });
    case LOAD_CONFIGURATION: {
      const { bookmarks: actionBookmarks = [] } = action;
      return state.concat(actionBookmarks);
    }
    default:
      return state;
  }
};

export default bookmarks;
