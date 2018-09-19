import { Reducer } from 'redux';
import { CHANGE_LANGUAGE } from '../actions/preferences';
import {
  AVAILABLE_LANGUAGES,
  AVAILABLE_PLAYBACK_RATES,
  DEFAULT_LANG,
  DEFAULT_SEEK_STEP
} from '../constants';

export interface IPreferencesState {
  availableLanguages: string[];
  availablePlaybackRates: number[];
  language: string;
  seekStep: number;
}

const initialState: IPreferencesState = {
  availableLanguages: AVAILABLE_LANGUAGES,
  availablePlaybackRates: AVAILABLE_PLAYBACK_RATES,
  language: DEFAULT_LANG,
  seekStep: DEFAULT_SEEK_STEP
};

const preferences: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.language
      };
    default:
      return state;
  }
};

export default preferences;
