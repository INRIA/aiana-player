import { Reducer } from 'redux';
import {
  CHANGE_LANGUAGE,
  CHANGE_TEXT_HIGHLIGHTING,
  CHANGE_TEXT_UPPERCASE,
  CHANGE_THEME,
  CHANGE_WIDGET_VISIBILITY,
  UPDATE_ACTIVE_FONT_FACE,
  UPDATE_FONT_SIZE_MULTIPLIER,
  UPDATE_LINE_HEIGHT,
  WIDGETS_LOCK
} from '../actions/preferences';
import { CHANGE_WIDGETS, LOAD_CONFIGURATION } from '../actions/shared';
import {
  AVAILABLE_PLAYBACK_RATES,
  AVAILABLE_THEMES,
  AVAILABLE_LANGUAGES,
  SELECTABLE_FONT_FACES,
  FONT_SIZE_MULTIPLIERS,
  SELECTABLE_LINE_HEIGHTS
} from '../constants';
import {
  DEFAULT_FONT_FACE,
  DEFAULT_FONT_UPPERCASE,
  DEFAULT_FONT_SIZE_MULTIPLIER,
  DEFAULT_LANG,
  DEFAULT_LINE_HEIGHT,
  DEFAULT_PREVIOUS_CHAPTER_SEEK_THRESHOLD,
  DEFAULT_SEEK_STEP,
  DEFAULT_SEEK_STEP_MULTIPLIER,
  DEFAULT_TEXT_HIGHLIGHTING,
  DEFAULT_THEME,
  DEFAULT_VOLUME_STEP,
  DEFAULT_VOLUME_STEP_MULTIPLIER
} from '../constants/preferences';
import { DEFAULT_WIDGETS } from '../constants/widgets';

export interface IWidget {
  height: number;
  left: number;
  locked: boolean;
  name: string;
  top: number;
  visible: boolean;
  width: number;
}

export interface IPreferencesState {
  fontFace: string;
  fontFaces: string[];
  fontUppercase: boolean;
  fontSizeMultiplier: number;
  fontSizeMultipliers: number[];
  language: string;
  languages: string[];
  lineHeight: number;
  lineHeightValues: number[];
  playbackRates: number[];
  previousChapterSeekThreshold: number;

  /**
   * The base number of seconds to go forward or backard after a keyboard
   * event on seek bar.
   */
  seekStep: number;
  seekStepMultiplier: number;
  textHighlighting: boolean;
  theme: string;
  themes: string[];
  volumeStep: number;
  volumeStepMultiplier: number;
  widgets: IWidget[];
}

export const initialPreferencesState: IPreferencesState = {
  fontFace: DEFAULT_FONT_FACE,
  fontFaces: SELECTABLE_FONT_FACES,
  fontSizeMultiplier: DEFAULT_FONT_SIZE_MULTIPLIER,
  fontSizeMultipliers: FONT_SIZE_MULTIPLIERS,
  fontUppercase: DEFAULT_FONT_UPPERCASE,
  language: DEFAULT_LANG,
  languages: AVAILABLE_LANGUAGES,
  lineHeight: DEFAULT_LINE_HEIGHT,
  lineHeightValues: SELECTABLE_LINE_HEIGHTS,
  playbackRates: AVAILABLE_PLAYBACK_RATES,
  previousChapterSeekThreshold: DEFAULT_PREVIOUS_CHAPTER_SEEK_THRESHOLD,
  seekStep: DEFAULT_SEEK_STEP,
  seekStepMultiplier: DEFAULT_SEEK_STEP_MULTIPLIER,
  textHighlighting: DEFAULT_TEXT_HIGHLIGHTING,
  theme: DEFAULT_THEME,
  themes: AVAILABLE_THEMES,
  volumeStep: DEFAULT_VOLUME_STEP,
  volumeStepMultiplier: DEFAULT_VOLUME_STEP_MULTIPLIER,
  widgets: DEFAULT_WIDGETS
};

const preferences: Reducer = (state = initialPreferencesState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.language
      };
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.theme
      };
    case LOAD_CONFIGURATION:
      return {
        ...state,
        ...action.preferences
      };
    case CHANGE_WIDGETS:
      return {
        ...state,
        widgets: state.widgets.map((widget: IWidget) => {
          if (widget.name === action.widgetName) {
            return {
              ...widget,
              ...action.widget
            };
          }

          return widget;
        })
      };
    case WIDGETS_LOCK:
      return {
        ...state,
        widgets: state.widgets.map((widget: IWidget) => ({
          ...widget,
          locked: action.locked
        }))
      };
    case CHANGE_WIDGET_VISIBILITY:
      return {
        ...state,
        widgets: state.widgets.map((widget: IWidget) => ({
          ...widget,
          visible:
            widget.name === action.widgetName ? action.visible : widget.visible
        }))
      };
    case UPDATE_ACTIVE_FONT_FACE:
      return {
        ...state,
        fontFace: action.fontFace
      };
    case UPDATE_FONT_SIZE_MULTIPLIER:
      return {
        ...state,
        fontSizeMultiplier: action.fontSizeMultiplier
      };
    case CHANGE_TEXT_HIGHLIGHTING:
      return {
        ...state,
        textHighlighting: action.textHighlighting
      };
    case CHANGE_TEXT_UPPERCASE:
      return {
        ...state,
        fontUppercase: action.fontUppercase
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
