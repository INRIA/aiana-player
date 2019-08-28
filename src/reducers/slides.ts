import { loadConfiguration } from '../actions/shared/configuration';
import {
  updateActiveSlidesTrack,
  addSlidesTrack,
  setSlidesText
} from '../actions/slides';
import { DEFAULT_LANG } from '../constants/preferences';
import { IRawSlidesTrack } from '../utils/media';
import { createReducer } from 'redux-starter-kit';

export interface ISlidesTrack {
  label?: string;
  src?: string;
  srcLang?: string;
}

export interface ISlidesState {
  currentSlideText?: string;
  language: string;
  slidesTracks: IRawSlidesTrack[];
  sources: ISlidesTrack[];
}

const initialState: ISlidesState = {
  language: DEFAULT_LANG,
  slidesTracks: [],
  sources: []
};

const slidesReducer = createReducer(initialState, {
  [addSlidesTrack.toString()]: (state: ISlidesState, action) => {
    state.slidesTracks.push(action.payload);
  },
  [setSlidesText.toString()]: (state: ISlidesState, action) => {
    state.currentSlideText = action.payload;
  },
  [updateActiveSlidesTrack.toString()]: (state: ISlidesState, action) => {
    state.language = action.payload;
  },
  [loadConfiguration.toString()]: (state: ISlidesState, action) => {
    return {
      ...state,
      ...action.payload.slides
    };
  }
});

export function getSelectedTrack(
  state: ISlidesState
): IRawSlidesTrack | undefined {
  return state.slidesTracks.find((track) => track.language === state.language);
}

export function getSelectedTrackLanguage(state: ISlidesState): string {
  const selectedTrack = getSelectedTrack(state);
  return selectedTrack ? selectedTrack.language : '';
}

export default slidesReducer;
