import { Reducer } from 'redux';
import { ADD_BOOKMARK } from 'src/actions/bookmarks';

interface IBookmark {
  readonly time: number;
}

export type IBookmarks = IBookmark[];

const initialState: IBookmarks = [{ time: 13 }, { time: 50 }];

const bookmarks: Reducer = (state: IBookmarks = initialState, action) => {
  switch (action.type) {
    case ADD_BOOKMARK:
      if (state.find((mark) => mark.time === action.time)) {
        return state;
      }
      return state.concat({ time: action.time });
    default:
      return state;
  }
};

export default bookmarks;
