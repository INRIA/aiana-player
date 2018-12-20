import { Reducer } from 'redux';
import { CHANGE_LANGUAGE, CHANGE_THEME } from '../actions/preferences';
import { LOAD_CONFIGURATION, TOGGLE_ACTIVITY } from '../actions/shared';
import {
  AVAILABLE_PLAYBACK_RATES,
  AVAILABLE_THEMES,
  DEFAULT_AVAILABLE_LANGUAGES,
  DEFAULT_LANG,
  DEFAULT_SEEK_STEP,
  DEFAULT_SEEK_STEP_MULTIPLIER,
  DEFAULT_THEME,
  DEFAULT_VOLUME_STEP,
  DEFAULT_VOLUME_STEP_MULTIPLIER
} from '../constants';
import InriaTheme from '../themes/inria';
import { IAianaTheme } from '../utils/styled-components';

export interface IPreferencesState {
  currentLanguage: string;
  currentTheme: string;
  customTheme: IAianaTheme;
  isActive: boolean;
  languages: string[];
  playbackRates: number[];
  /**
   * The base number of seconds to go forward or backard after a keyboard
   * event on seek bar.
   */
  seekStep: number;
  seekStepMultiplier: number;
  themes: string[];
  volumeStep: number;
  volumeStepMultiplier: number;
}

const initialState: IPreferencesState = {
  currentLanguage: DEFAULT_LANG,
  currentTheme: DEFAULT_THEME,
  customTheme: InriaTheme,
  isActive: true,
  languages: DEFAULT_AVAILABLE_LANGUAGES,
  playbackRates: AVAILABLE_PLAYBACK_RATES,
  seekStep: DEFAULT_SEEK_STEP,
  seekStepMultiplier: DEFAULT_SEEK_STEP_MULTIPLIER,
  themes: AVAILABLE_THEMES,
  volumeStep: DEFAULT_VOLUME_STEP,
  volumeStepMultiplier: DEFAULT_VOLUME_STEP_MULTIPLIER
};

const preferences: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ACTIVITY:
      return {
        ...state,
        isActive: action.isActive
      };
    case CHANGE_LANGUAGE:
      return {
        ...state,
        currentLanguage: action.currentLanguage
      };
    case CHANGE_THEME:
      return {
        ...state,
        currentTheme: action.currentTheme
      };
    case LOAD_CONFIGURATION:
      return {
        ...state,
        ...action.preferences
      };
    default:
      return state;
  }
};

export default preferences;
