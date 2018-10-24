import { Reducer } from 'redux';
import { CHANGE_LANGUAGE, CHANGE_THEME } from '../actions/preferences';
import {
  AVAILABLE_LANGUAGES,
  AVAILABLE_PLAYBACK_RATES,
  AVAILABLE_THEMES,
  DEFAULT_LANG,
  DEFAULT_SEEK_STEP,
  DEFAULT_THEME,
  DEFAULT_VOLUME_STEP
} from '../constants';
import InriaTheme from '../themes/inria';
import { IAianaTheme } from '../utils/styled-components';

export interface IPreferencesState {
  availableLanguages: string[];
  availablePlaybackRates: number[];
  availableThemes: string[];
  currentTheme: string;
  customTheme: IAianaTheme;
  language: string;
  /**
   * The base number of seconds to go forward or backard after a keyboard
   * event on seek bar.
   */
  seekStep: number;
  volumeStep: number;
}

const initialState: IPreferencesState = {
  availableLanguages: AVAILABLE_LANGUAGES,
  availablePlaybackRates: AVAILABLE_PLAYBACK_RATES,
  availableThemes: AVAILABLE_THEMES,
  currentTheme: DEFAULT_THEME,
  customTheme: InriaTheme,
  language: DEFAULT_LANG,
  seekStep: DEFAULT_SEEK_STEP,
  volumeStep: DEFAULT_VOLUME_STEP
};

const preferences: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.language
      };
    case CHANGE_THEME:
      return {
        ...state,
        currentTheme: action.themeName
      };
    default:
      return state;
  }
};

export default preferences;
