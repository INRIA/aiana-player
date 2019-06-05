import { AnyAction } from 'redux';
import i18n from '../i18n';
import { CDispatch } from '../store';
import { ThunkResult } from '../types';

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

export function changeMediaSource(mediaSource: string): AnyAction {
  return {
    mediaSource,
    type: CHANGE_MEDIA_SOURCE
  };
}

export function updateLineHeight(lineHeight: number): AnyAction {
  return {
    lineHeight,
    type: UPDATE_LINE_HEIGHT
  };
}

export function setFontUppercase(fontUppercase: boolean): AnyAction {
  return {
    fontUppercase,
    type: CHANGE_TEXT_UPPERCASE
  };
}

export function setTextHighlighting(textHighlighting: boolean): AnyAction {
  return {
    textHighlighting,
    type: CHANGE_TEXT_HIGHLIGHTING
  };
}

export function updateFontSizeMultiplier(
  fontSizeMultiplier: number
): AnyAction {
  return {
    fontSizeMultiplier,
    type: UPDATE_FONT_SIZE_MULTIPLIER
  };
}

export function updateActiveFontFace(fontFace: string): AnyAction {
  return {
    fontFace,
    type: UPDATE_ACTIVE_FONT_FACE
  };
}

export function setWidgetVisibility(
  widgetName: string,
  visible: boolean
): AnyAction {
  return {
    type: CHANGE_WIDGET_VISIBILITY,
    visible,
    widgetName
  };
}

export function setWidgetsLock(locked: boolean): AnyAction {
  return {
    locked,
    type: WIDGETS_LOCK
  };
}

export function changeLanguage(language: string): ThunkResult<void> {
  return async (dispatch: CDispatch) => {
    await i18n.changeLanguage(language);
    dispatch(changeUILanguage(language));
  };
}

function changeUILanguage(language: string): AnyAction {
  return {
    language,
    type: CHANGE_LANGUAGE
  };
}

export function changeActiveTheme(theme: string): AnyAction {
  return {
    theme,
    type: CHANGE_THEME
  };
}
