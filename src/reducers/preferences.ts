import { Reducer } from 'redux';
import { CHANGE_LANGUAGE, CHANGE_THEME } from '../actions/preferences';
import {
  CHANGE_UI_WINDOWS,
  LOAD_CONFIGURATION,
  TOGGLE_ACTIVITY
} from '../actions/shared';
import {
  AVAILABLE_PLAYBACK_RATES,
  AVAILABLE_THEMES,
  DEFAULT_AVAILABLE_LANGUAGES,
  DEFAULT_LANG,
  DEFAULT_SEEK_STEP,
  DEFAULT_SEEK_STEP_MULTIPLIER,
  DEFAULT_THEME,
  DEFAULT_UI_PLACEMENT,
  DEFAULT_VOLUME_STEP,
  DEFAULT_VOLUME_STEP_MULTIPLIER
} from '../constants';
import InriaTheme from '../themes/inria';
import { IAianaTheme } from '../utils/styled-components';

export interface IUIWindow {
  height?: number;
  left?: number;
  top?: number;
  width?: number;
}

export interface IUIPlacement {
  additionalInfos: IUIWindow;
  chapters: IUIWindow;
  slides: IUIWindow;
  video: IUIWindow;
}

export interface IPreferencesState {
  currentTheme: string;
  customTheme: IAianaTheme;
  isActive: boolean;
  language: string;
  languages: string[];
  playbackRates: number[];
  /**
   * The base number of seconds to go forward or backard after a keyboard
   * event on seek bar.
   */
  seekStep: number;
  seekStepMultiplier: number;
  themes: string[];
  uiPlacement: IUIPlacement;
  volumeStep: number;
  volumeStepMultiplier: number;
}

const initialState: IPreferencesState = {
  currentTheme: DEFAULT_THEME,
  customTheme: InriaTheme,
  isActive: true,
  language: DEFAULT_LANG,
  languages: DEFAULT_AVAILABLE_LANGUAGES,
  playbackRates: AVAILABLE_PLAYBACK_RATES,
  seekStep: DEFAULT_SEEK_STEP,
  seekStepMultiplier: DEFAULT_SEEK_STEP_MULTIPLIER,
  themes: AVAILABLE_THEMES,
  uiPlacement: DEFAULT_UI_PLACEMENT,
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
        language: action.language
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
    case CHANGE_UI_WINDOWS:
      return {
        ...state,
        uiPlacement: {
          ...state.uiPlacement,
          [action.windowName]: {
            ...state.uiPlacement[action.windowName],
            ...action.window
          }
        }
      };
    default:
      return state;
  }
};

export default preferences;
