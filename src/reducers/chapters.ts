import { Reducer } from 'redux';
import {
  ADD_CHAPTER_TRACK,
  TOGGLE_CHAPTERS_MENU,
  UPDATE_ACTIVE_CHAPTERS_TRACK,
  UPDATE_CHAPTER_TEXT
} from '../actions/chapters';
import { LOAD_CONFIGURATION } from '../actions/shared';
import { DEFAULT_MENU_ENABLED } from '../constants';
import { DEFAULT_LANG } from '../constants/preferences';
import { IRawChaptersTrack } from '../utils/media';
import { IStdAction } from '../types';

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

const chapters: Reducer<IChaptersState, IStdAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case TOGGLE_CHAPTERS_MENU:
      return {
        ...state,
        menuEnabled: action.payload.enabled
      };
    case UPDATE_CHAPTER_TEXT:
      return {
        ...state,
        currentText: action.payload.text
      };
    case ADD_CHAPTER_TRACK: {
      const chaptersTracks = ([] as IRawChaptersTrack[]).concat(
        state.chaptersTracks,
        action.payload.chaptersTrack as IRawChaptersTrack
      );

      return {
        ...state,
        chaptersTracks
      };
    }
    case UPDATE_ACTIVE_CHAPTERS_TRACK: {
      const chaptersTracks = state.chaptersTracks.map((track) => {
        if (track.language === action.payload.language) {
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
        language: action.payload.language
      };
    }
    case LOAD_CONFIGURATION:
      return {
        ...state,
        ...action.payload.chapters
      };
    default:
      return state;
  }
};

export function getSelectedChaptersTrack(state: IChaptersState) {
  return state.chaptersTracks.find(
    (track) => track.language === state.language
  );
}

export function getSelectedChaptersTrackCues(state: IChaptersState) {
  const track = getSelectedChaptersTrack(state);

  return !track ? undefined : [...track.cues];
}

export function getSelectedChaptersLanguage(state: IChaptersState): string {
  const selectedTrack = getSelectedChaptersTrack(state);
  return selectedTrack ? selectedTrack.language : '';
}

export default chapters;
