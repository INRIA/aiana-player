import { AnyAction } from 'redux';
import i18n from '../i18n';
import { CDispatch } from '../store';
import { ThunkResult } from '../types';
import { TOGGLE_ACTIVITY } from './shared';

export const CHANGE_LANGUAGE = 'aiana/CHANGE_LANGUAGE';
export const CHANGE_THEME = 'aiana/CHANGE_THEME';
export const WINDOWS_LOCK = 'aiana/WINDOWS_LOCK';
export const CHANGE_WINDOW_VISIBILITY = 'aiana/CHANGE_WINDOW_VISIBILITY';
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

export function updateLineHeight(lineHeight: string): AnyAction {
  return {
    lineHeight,
    type: UPDATE_LINE_HEIGHT
  };
}

export function setFontModifierUppercase(uppercase: boolean): AnyAction {
  return {
    fontModifierUppercase: uppercase,
    type: CHANGE_TEXT_UPPERCASE
  };
}

export function setTextHighlighting(textHighlighting: boolean): AnyAction {
  return {
    textHighlighting,
    type: CHANGE_TEXT_HIGHLIGHTING
  };
}

export function updateActiveFontSizeMultiplier(multiplier: number): AnyAction {
  return {
    activeFontSizeMultiplier: multiplier,
    type: UPDATE_FONT_SIZE_MULTIPLIER
  };
}

export function updateActiveFontFace(fontFace: string): AnyAction {
  return {
    activeFontFace: fontFace,
    type: UPDATE_ACTIVE_FONT_FACE
  };
}

export function setWindowVisibility(
  windowId: string,
  visible: boolean
): AnyAction {
  return {
    type: CHANGE_WINDOW_VISIBILITY,
    visible,
    windowId
  };
}

export function setWindowsLock(locked: boolean): AnyAction {
  return {
    locked,
    type: WINDOWS_LOCK
  };
}

export function changeCurrentLanguage(language: string): ThunkResult<void> {
  return async (dispatch: CDispatch) => {
    await i18n.changeLanguage(language);
    dispatch(changeLanguage(language));
  };
}

function changeLanguage(language: string): AnyAction {
  return {
    language,
    type: CHANGE_LANGUAGE
  };
}

export function changeCurrentTheme(themeName: string): AnyAction {
  return {
    currentTheme: themeName,
    type: CHANGE_THEME
  };
}

export function toggleActivity(isActive: boolean): AnyAction {
  return {
    isActive,
    type: TOGGLE_ACTIVITY
  };
}
