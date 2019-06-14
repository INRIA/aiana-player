import { Reducer } from 'redux';
import { ADD_BOOKMARK } from '../actions/bookmarks';
import { LOAD_CONFIGURATION } from '../actions/shared';
import { IStdAction } from '../types';

export interface IBookmark {
  readonly time: number;
}

type IBookmarkState = IBookmark[];

function hasBookmark(time: number, state: IBookmarkState): boolean {
  return state.find((b) => b.time === time) ? true : false;
}

const bookmarks: Reducer<IBookmarkState, IStdAction> = (state = [], action) => {
  switch (action.type) {
    case ADD_BOOKMARK: {
      if (hasBookmark(action.payload.time, state)) {
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
