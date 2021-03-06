import {
  addChaptersTrack,
  setChapterText,
  updateActiveChaptersTrack
} from '../actions/chapters';
import { loadConfiguration } from '../actions/shared/configuration';
import { DEFAULT_LANG } from '../constants/preferences';
import { IRawTrackExt, IRawTrack, getTrackKey } from '../utils/media';
import { createReducer, PayloadAction } from 'redux-starter-kit';

export interface IChaptersTrack {
  label: string;
  src: string;
  srcLang: string;
}

export interface IChaptersState {
  chaptersTracks: IRawTrackExt[];
  language: string;
  sources: IChaptersTrack[];
  currentText?: string;
}

const initialState: IChaptersState = {
  chaptersTracks: [],
  language: DEFAULT_LANG,
  sources: []
};

export const chaptersReducer = createReducer(initialState, {
  [setChapterText.type]: (state: IChaptersState, action) => {
    state.currentText = action.payload;
  },
  [addChaptersTrack.type]: (
    state: IChaptersState,
    action: PayloadAction<IRawTrack>
  ) => {
    const trackKey = getTrackKey(action.payload);
    const hasTrack = state.chaptersTracks.some((track) => {
      return getTrackKey(track) === trackKey;
    });

    if (!hasTrack) {
      state.chaptersTracks.push(action.payload);
    }
  },
  [updateActiveChaptersTrack.type]: (state: IChaptersState, action) => {
    const lang = action.payload;

    state.language = lang;
    state.chaptersTracks = state.chaptersTracks.map((track) => ({
      ...track,
      active: track.language === lang
    }));
  },
  [loadConfiguration.type]: (state: IChaptersState, action) => {
    return {
      ...state,
      ...action.payload.chapters
    };
  }
});

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

export default chaptersReducer;
