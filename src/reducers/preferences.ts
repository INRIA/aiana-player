import cloneDeep from 'lodash.clonedeep';
import { safeDump, safeLoad } from 'js-yaml';
import { DeepPartial } from 'redux';
import { createReducer, PayloadAction } from 'redux-starter-kit';
import { loadConfiguration } from '../actions/shared/configuration';
import {
  toggleFontUppercase,
  toggleTextHighlighting,
  setWidgetsLock,
  updateLineHeight,
  updateFontSizeMultiplier,
  updateActiveFontFace,
  toggleWidgetVisibility
} from '../actions/preferences';
import { changeUILanguage, changeActiveTheme } from '../actions/preferences';
import { importPreferencesAction } from '../actions/preferences';
import { updateWidget } from '../actions/shared/remote-loader';
import { updateActivePreset } from '../actions/presets';
import { IPreset } from './presets';
import { initialPreferencesState } from '../constants/default-preferences-state';
import {
  // DEFAULT_FONT_FACE,
  DEFAULT_FONT_SIZE_MULTIPLIER,
  DEFAULT_FONT_UPPERCASE,
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
import {
  SELECTABLE_FONT_FACES,
  // AVAILABLE_PLAYBACK_RATES,
  SELECTABLE_LINE_HEIGHTS,
  AVAILABLE_LANGUAGES,
  FONT_SIZE_MULTIPLIERS,
  AVAILABLE_THEMES
} from '../constants';
import { DEFAULT_WIDGETS } from '../constants/widgets';

export interface IWidget {
  ghost?: boolean;
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

const preferencesReducer = createReducer(
  {
    fontFace: 'verdana',
    fontFaces: [...SELECTABLE_FONT_FACES],
    fontSizeMultiplier: DEFAULT_FONT_SIZE_MULTIPLIER,
    fontSizeMultipliers: [...FONT_SIZE_MULTIPLIERS],
    fontUppercase: DEFAULT_FONT_UPPERCASE,
    language: DEFAULT_LANG,
    languages: [...AVAILABLE_LANGUAGES],
    lineHeight: DEFAULT_LINE_HEIGHT,
    lineHeightValues: [...SELECTABLE_LINE_HEIGHTS],
    playbackRates: [1],
    previousChapterSeekThreshold: DEFAULT_PREVIOUS_CHAPTER_SEEK_THRESHOLD,
    seekStep: DEFAULT_SEEK_STEP,
    seekStepMultiplier: DEFAULT_SEEK_STEP_MULTIPLIER,
    textHighlighting: DEFAULT_TEXT_HIGHLIGHTING,
    theme: DEFAULT_THEME,
    themes: cloneDeep(AVAILABLE_THEMES),
    volumeStep: DEFAULT_VOLUME_STEP,
    volumeStepMultiplier: DEFAULT_VOLUME_STEP_MULTIPLIER,
    widgets: cloneDeep(DEFAULT_WIDGETS)
  },
  {
    [importPreferencesAction.type]: (
      state,
      action: PayloadAction<IPreferencesState>
    ) => {
      return action.payload;
    },
    [updateActivePreset.type]: (state, action) => {
      return {
        fontFace: action.payload.fontFace,
        fontFaces: [...action.payload.fontFaces],
        fontUppercase: action.payload.fontUppercase,
        fontSizeMultiplier: action.payload.fontSizeMultiplier,
        fontSizeMultipliers: [...action.payload.fontSizeMultipliers],
        language: action.payload.language,
        languages: [...action.payload.languages],
        lineHeight: action.payload.lineHeight,
        lineHeightValues: [...action.payload.lineHeightValues],
        playbackRates: [...action.payload.playbackRates],
        previousChapterSeekThreshold:
          action.payload.previousChapterSeekThreshold,
        seekStep: action.payload.seekStep,
        seekStepMultiplier: action.payload.seekStepMultiplier,
        textHighlighting: action.payload.textHighlighting,
        theme: action.payload.theme,
        themes: [...action.payload.themes],
        volumeStep: action.payload.volumeStep,
        volumeStepMultiplier: action.payload.volumeStepMultiplier,
        widgets: [...action.payload.widgets]
      };
    },
    [changeUILanguage.type]: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    [changeActiveTheme.type]: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    [loadConfiguration.type]: (state, action) => {
      const activePreset = action.payload.presets.find(
        (p: IPreset) => p.selected
      );

      return Object.assign(
        cloneDeep(initialPreferencesState),
        cloneDeep(activePreset),
        cloneDeep(state)
      );
    },
    [updateWidget.type]: (state, action) => {
      state.widgets = state.widgets.map((widget) => {
        if (widget.name === action.payload.name) {
          return {
            ...widget,
            ...action.payload.widget
          };
        }

        return widget;
      });
    },
    [setWidgetsLock.type]: (state, action: PayloadAction<boolean>) => {
      state.widgets = state.widgets.map((widget: IWidget) => ({
        ...widget,
        locked: action.payload
      }));
    },
    [toggleWidgetVisibility.type]: (state, action: PayloadAction<string>) => {
      state.widgets = state.widgets.map((widget: IWidget) => {
        const w = { ...widget };

        if (w.name === action.payload) {
          w.visible = !w.visible;
        }

        return w;
      });
    },
    [updateActiveFontFace.type]: (state, action: PayloadAction<string>) => {
      state.fontFace = action.payload;
    },
    [updateFontSizeMultiplier.type]: (state, action: PayloadAction<number>) => {
      state.fontSizeMultiplier = action.payload;
    },
    [toggleTextHighlighting.type]: (state) => {
      state.textHighlighting = !state.textHighlighting;
    },
    [toggleFontUppercase.type]: (state) => {
      state.fontUppercase = !state.fontUppercase;
    },
    [updateLineHeight.type]: (state, action: PayloadAction<number>) => {
      state.lineHeight = action.payload;
    }
  }
);

export function preferencesToYAML(state: DeepPartial<IPreferencesState>) {
  const exportedKeys = [
    'fontFace',
    'fontSizeMultiplier',
    'fontUppercase',
    'language',
    'lineHeight',
    'previousChapterSeekThreshold',
    'seekStep',
    'seekStepMultiplier',
    'textHighlighting',
    'theme',
    'volumeStep',
    'volumeStepMultiplier',
    'widgets'
  ];

  try {
    const exportedPrefs = exportedKeys.reduce((acc, cur) => {
      return Object.assign(acc, { [cur]: cloneDeep(state[cur]) });
    }, {});

    return safeDump(exportedPrefs);
  } catch (err) {
    return '';
  }
}

export function getLocalPreferencesState() {
  try {
    const serializedPreferences = localStorage.getItem('aiana-preferences');

    if (serializedPreferences === null) {
      return undefined;
    }

    return Object.assign(
      cloneDeep(initialPreferencesState),
      safeLoad(serializedPreferences)
    );
  } catch (err) {
    return undefined;
  }
}

export default preferencesReducer;
