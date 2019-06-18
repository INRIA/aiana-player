import i18n from '../i18n';
import cloneDeep from 'lodash.clonedeep';
import { CDispatch } from '../store';
import { ThunkResult, IStdAction } from '../types';
import {
  IPreferencesState,
  initialPreferencesState
} from '../reducers/preferences';

export const CHANGE_LANGUAGE = 'aiana/CHANGE_LANGUAGE';
export const CHANGE_THEME = 'aiana/CHANGE_THEME';
export const WIDGETS_LOCK = 'aiana/WIDGETS_LOCK';
export const CHANGE_WIDGET_VISIBILITY = 'aiana/CHANGE_WIDGET_VISIBILITY';
export const UPDATE_ACTIVE_FONT_FACE = 'aiana/UPDATE_ACTIVE_FONT_FACE';
export const UPDATE_FONT_SIZE_MULTIPLIER = 'aiana/UPDATE_FONT_SIZE_MULTIPLIER';
export const CHANGE_TEXT_HIGHLIGHTING = 'aiana/CHANGE_TEXT_HIGHLIGHTING';
export const CHANGE_TEXT_UPPERCASE = 'aiana/CHANGE_TEXT_UPPERCASE';
export const UPDATE_LINE_HEIGHT = 'aiana/CHANGE_LINE_HEIGHT';
export const CHANGE_MEDIA_SOURCE = 'aiana/CHANGE_MEDIA_SOURCE';
export const EXPORT_PREFERENCES = 'aiana/EXPORT_PREFERENCES';
export const IMPORT_PREFERENCES = 'aiana/IMPORT_PREFERENCES';

export function importPreferences(
  preferences: Partial<IPreferencesState>
): ThunkResult<void> {
  return (dispatch) => {
    const mergedPreferences = Object.assign(
      cloneDeep(initialPreferencesState),
      cloneDeep(preferences)
    );

    dispatch(changeLanguage(mergedPreferences.language));
    dispatch({
      payload: mergedPreferences,
      type: IMPORT_PREFERENCES
    });
  };
}

export function exportPreferences(
  preferences: Partial<IPreferencesState>
): IStdAction {
  return {
    payload: {
      preferences
    },
    type: EXPORT_PREFERENCES
  };
}

export function changeMediaSource(mediaSource: string): IStdAction {
  return {
    payload: {
      mediaSource
    },
    type: CHANGE_MEDIA_SOURCE
  };
}

export function updateLineHeight(lineHeight: number): IStdAction {
  return {
    payload: {
      lineHeight
    },
    type: UPDATE_LINE_HEIGHT
  };
}

export function setFontUppercase(fontUppercase: boolean): IStdAction {
  return {
    payload: {
      fontUppercase
    },
    type: CHANGE_TEXT_UPPERCASE
  };
}

export function setTextHighlighting(textHighlighting: boolean): IStdAction {
  return {
    payload: {
      textHighlighting
    },
    type: CHANGE_TEXT_HIGHLIGHTING
  };
}

export function updateFontSizeMultiplier(
  fontSizeMultiplier: number
): IStdAction {
  return {
    payload: {
      fontSizeMultiplier
    },
    type: UPDATE_FONT_SIZE_MULTIPLIER
  };
}

export function updateActiveFontFace(fontFace: string): IStdAction {
  return {
    payload: {
      fontFace
    },
    type: UPDATE_ACTIVE_FONT_FACE
  };
}

export function setWidgetVisibility(
  widgetName: string,
  visible: boolean
): IStdAction {
  return {
    payload: {
      visible,
      widgetName
    },
    type: CHANGE_WIDGET_VISIBILITY
  };
}

export function setWidgetsLock(locked: boolean): IStdAction {
  return {
    payload: {
      locked
    },
    type: WIDGETS_LOCK
  };
}

export function changeLanguage(language: string): ThunkResult<void> {
  return async (dispatch: CDispatch) => {
    await i18n.changeLanguage(language);
    dispatch(changeUILanguage(language));
  };
}

function changeUILanguage(language: string): IStdAction {
  return {
    payload: {
      language
    },
    type: CHANGE_LANGUAGE
  };
}

export function changeActiveTheme(theme: string): IStdAction {
  return {
    payload: {
      theme
    },
    type: CHANGE_THEME
  };
}
