import { Reducer } from 'redux';
import { ADD_BOOKMARK } from '../actions/bookmarks';
import { LOAD_CONFIGURATION } from '../actions/shared';
import { IStdAction } from '../types';

export interface IBookmark {
  readonly time: number;
}

const bookmarks: Reducer<IBookmark[], IStdAction> = (state = [], action) => {
  switch (action.type) {
    case ADD_BOOKMARK: {
      const bookmarkExists = state.find((b) => b.time === action.payload.time);

      if (bookmarkExists) {
        return state;
      }
      return ([] as IBookmark[]).concat(state, { time: action.payload.time });
    }
    case LOAD_CONFIGURATION: {
      return ([] as IBookmark[]).concat(state, action.payload.bookmarks);
    }
    default:
      return state;
  }
};

export default bookmarks;
