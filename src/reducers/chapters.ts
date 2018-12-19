import { Reducer } from 'redux';
import {
  ADD_CHAPTER_TRACK,
  UPDATE_ACTIVE_CHAPTERS_TRACK,
  UPDATE_CHAPTER_TEXT
} from '../actions/chapters';
import { LOAD_CONFIGURATION } from '../actions/shared';
import { DEFAULT_LANG, DEFAULT_MENU_ENABLED } from '../constants';
import { IRawChaptersTrack } from '../utils/media';

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
  currentText?: string;
}

const initialState: IChaptersState = {
  chaptersTracks: [],
  language: DEFAULT_LANG,
  menuEnabled: DEFAULT_MENU_ENABLED,
  sources: []
};

const chapters: Reducer = (state: IChaptersState = initialState, action) => {
  switch (action.type) {
    case UPDATE_CHAPTER_TEXT:
      return {
        ...state,
        currentText: action.text
      };
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
    case UPDATE_ACTIVE_CHAPTERS_TRACK: {
      const chaptersTracks = state.chaptersTracks.map((track) => {
        if (track.language === action.language) {
          return { ...track, active: true };
        }
        if (track.active === true) {
          return { ...track, active: false };
        }
        return { ...track };
      });

      return {
        ...state,
        chaptersTracks,
        language: action.language
      };
    }
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
