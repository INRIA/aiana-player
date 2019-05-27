import { Reducer } from 'redux';
import {
  CHANGE_LANGUAGE,
  CHANGE_TEXT_HIGHLIGHTING,
  CHANGE_TEXT_UPPERCASE,
  CHANGE_THEME,
  CHANGE_WINDOW_VISIBILITY,
  UPDATE_ACTIVE_FONT_FACE,
  UPDATE_FONT_SIZE_MULTIPLIER,
  UPDATE_LINE_HEIGHT,
  WINDOWS_LOCK
} from '../actions/preferences';
import {
  CHANGE_UI_WINDOWS,
  LOAD_CONFIGURATION,
  TOGGLE_ACTIVITY
} from '../actions/shared';
import {
  AVAILABLE_PLAYBACK_RATES,
  AVAILABLE_THEMES,
  DEFAULT_ACTIVE_FONT_FACE,
  DEFAULT_AVAILABLE_LANGUAGES,
  DEFAULT_FONT_FACES,
  DEFAULT_FONT_MODIFIER_UPPERCASE,
  DEFAULT_FONT_SIZE_MULTIPLIER,
  DEFAULT_LANG,
  DEFAULT_LINE_HEIGHT,
  DEFAULT_PREVIOUS_CHAPTER_SEEK_THRESHOLD,
  DEFAULT_SEEK_STEP,
  DEFAULT_SEEK_STEP_MULTIPLIER,
  DEFAULT_TEXT_HIGHLIGHTING,
  DEFAULT_THEME,
  DEFAULT_UI_WINDOWS,
  DEFAULT_VOLUME_STEP,
  DEFAULT_VOLUME_STEP_MULTIPLIER,
  FONT_SIZE_MULTIPLIERS,
  LINE_HEIGHT_VALUES
} from '../constants';
import InriaTheme from '../themes/inria';
import { IAianaTheme } from '../utils/styled-components';

export interface IUIWindow {
  height: number;
  left: number;
  locked: boolean;
  name: string;
  top: number;
  visible: boolean;
  width: number;
}

export interface IPreferencesState {
  activeFontFace: string;
  activeFontSizeMultiplier: number;
  currentTheme: string;
  customTheme: IAianaTheme;
  fontFaces: string[];
  fontModifierUppercase: boolean;
  fontSizeMultipliers: number[];
  isActive: boolean;
  language: string;
  languages: string[];
  lineHeight: string;
  lineHeightValues: string[];
  playbackRates: number[];
  previousChapterSeekThreshold: number;

  /**
   * The base number of seconds to go forward or backard after a keyboard
   * event on seek bar.
   */
  seekStep: number;
  seekStepMultiplier: number;
  textHighlighting: boolean;
  themes: string[];
  uiWindows: IUIWindow[];
  volumeStep: number;
  volumeStepMultiplier: number;
}

const initialState: IPreferencesState = {
  activeFontFace: DEFAULT_ACTIVE_FONT_FACE,
  activeFontSizeMultiplier: DEFAULT_FONT_SIZE_MULTIPLIER,
  currentTheme: DEFAULT_THEME,
  customTheme: InriaTheme,
  fontFaces: DEFAULT_FONT_FACES,
  fontModifierUppercase: DEFAULT_FONT_MODIFIER_UPPERCASE,
  fontSizeMultipliers: FONT_SIZE_MULTIPLIERS,
  isActive: true,
  language: DEFAULT_LANG,
  languages: DEFAULT_AVAILABLE_LANGUAGES,
  lineHeight: DEFAULT_LINE_HEIGHT,
  lineHeightValues: LINE_HEIGHT_VALUES,
  playbackRates: AVAILABLE_PLAYBACK_RATES,
  previousChapterSeekThreshold: DEFAULT_PREVIOUS_CHAPTER_SEEK_THRESHOLD,
  seekStep: DEFAULT_SEEK_STEP,
  seekStepMultiplier: DEFAULT_SEEK_STEP_MULTIPLIER,
  textHighlighting: DEFAULT_TEXT_HIGHLIGHTING,
  themes: AVAILABLE_THEMES,
  uiWindows: DEFAULT_UI_WINDOWS,
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
        uiWindows: state.uiWindows.map((window: IUIWindow) => {
          if (window.name === action.windowName) {
            return {
              ...window,
              ...action.window
            };
          }

          return window;
        })
      };
    case WINDOWS_LOCK:
      return {
        ...state,
        uiWindows: state.uiWindows.map((window: IUIWindow) => ({
          ...window,
          locked: action.locked
        }))
      };
    case CHANGE_WINDOW_VISIBILITY:
      return {
        ...state,
        uiWindows: state.uiWindows.map((window: IUIWindow) => ({
          ...window,
          visible:
            window.name === action.windowName ? action.visible : window.visible
        }))
      };
    case UPDATE_ACTIVE_FONT_FACE:
      return {
        ...state,
        activeFontFace: action.activeFontFace
      };
    case UPDATE_FONT_SIZE_MULTIPLIER:
      return {
        ...state,
        activeFontSizeMultiplier: action.activeFontSizeMultiplier
      };
    case CHANGE_TEXT_HIGHLIGHTING:
      return {
        ...state,
        textHighlighting: action.textHighlighting
      };
    case CHANGE_TEXT_UPPERCASE:
      return {
        ...state,
        fontModifierUppercase: action.fontModifierUppercase
      };
    case UPDATE_LINE_HEIGHT:
      return {
        ...state,
        lineHeight: action.lineHeight
      };
    default:
      return state;
  }
};

export default preferences;
