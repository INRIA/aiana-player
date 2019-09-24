import { loadConfiguration } from '../actions/shared/configuration';
import {
  updateActiveSlidesTrack,
  addSlidesTrack,
  setSlidesText
} from '../actions/slides';
import { DEFAULT_LANG } from '../constants/preferences';
import { IRawTrack, getTrackKey } from '../utils/media';
import { createReducer, PayloadAction } from 'redux-starter-kit';

export interface ISlidesTrack {
  label?: string;
  src?: string;
  srcLang?: string;
}

export interface ISlidesState {
  currentSlideText?: string;
  language: string;
  slidesTracks: IRawTrack[];
  sources: ISlidesTrack[];
}

const initialState: ISlidesState = {
  language: DEFAULT_LANG,
  slidesTracks: [],
  sources: []
};

const slidesReducer = createReducer(initialState, {
  [addSlidesTrack.type]: (
    state: ISlidesState,
    action: PayloadAction<IRawTrack>
  ) => {
    const trackKey = getTrackKey(action.payload);
    const hasTrack = state.slidesTracks.some((track) => {
      return getTrackKey(track) === trackKey;
    });

    if (!hasTrack) {
      state.slidesTracks.push(action.payload);
    }
  },
  [setSlidesText.type]: (
    state: ISlidesState,
    action: PayloadAction<string | undefined>
  ) => {
    state.currentSlideText = action.payload;
  },
  [updateActiveSlidesTrack.type]: (
    state: ISlidesState,
    action: PayloadAction<string>
  ) => {
    state.language = action.payload;
  },
  [loadConfiguration.type]: (state: ISlidesState, action) => {
    return {
      ...state,
      ...action.payload.slides
    };
  }
});

export function getSelectedTrack(state: ISlidesState): IRawTrack | undefined {
  return state.slidesTracks.find((track) => track.language === state.language);
}

export function getSelectedTrackLanguage(state: ISlidesState): string {
  const selectedTrack = getSelectedTrack(state);
  return selectedTrack ? selectedTrack.language : '';
}

export default slidesReducer;
