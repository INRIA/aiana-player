import { Reducer } from 'redux';
import { LOAD_CONFIGURATION } from '../actions/shared';
import {
  ADD_SLIDES_TRACK,
  SET_SLIDES_TEXT,
  UPDATE_ACTIVE_SLIDES_TRACK
} from '../actions/slides';
import { DEFAULT_LANG } from '../constants/preferences';
import { IRawSlidesTrack } from '../utils/media';
import { IStdAction } from '../types';

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

const slides: Reducer<ISlidesState, IStdAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ADD_SLIDES_TRACK:
      const slidesTracks = ([] as IRawSlidesTrack[]).concat(
        state.slidesTracks,
        action.payload.track
      );

      return {
        ...state,
        slidesTracks
      };
    case SET_SLIDES_TEXT:
      return {
        ...state,
        currentSlideText: action.payload.text
      };
    case UPDATE_ACTIVE_SLIDES_TRACK:
      return {
        ...state,
        language: action.payload.language
      };
    case LOAD_CONFIGURATION:
      return {
        ...state,
        ...action.payload.slides
      };
    default:
      return state;
  }
};

export default slides;
