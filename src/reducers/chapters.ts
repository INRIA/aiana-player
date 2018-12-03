import { Reducer } from 'redux';
import {
  ADD_CHAPTER_TRACK,
  UPDATE_ACTIVE_CHAPTERS_TRACK
} from 'src/actions/chapters';
import { LOAD_CONFIGURATION } from 'src/actions/shared';
import { DEFAULT_LANG, DEFAULT_MENU_ENABLED } from 'src/constants';
import { IRawChaptersTrack } from 'src/utils/media';

export interface IChaptersTrack {
  label: string;
  src: string;
  srcLang: string;
}

export interface IChaptersState {
  chaptersTracks: IRawChaptersTrack[];
  language: string;
  menuEnabled: boolean;
  sources: IChaptersTrack[];
}

const initialState: IChaptersState = {
  chaptersTracks: [],
  language: DEFAULT_LANG,
  menuEnabled: DEFAULT_MENU_ENABLED,
  sources: []
};

const chapters: Reducer = (state: IChaptersState = initialState, action) => {
  switch (action.type) {
    case ADD_CHAPTER_TRACK: {
      const chaptersTracks = [].concat(
        state.chaptersTracks as any,
        action.chaptersTrack
      );

      return {
        ...state,
        chaptersTracks
      };
    }
    case UPDATE_ACTIVE_CHAPTERS_TRACK:
      return {
        ...state,
        language: action.language
      };
    case LOAD_CONFIGURATION:
      return {
        ...state,
        ...action.chapters
      };
    default:
      return state;
  }
};

export default chapters;
