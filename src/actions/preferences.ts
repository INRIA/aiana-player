import { AnyAction } from 'redux';
import i18n from '../i18n';
import { CDispatch } from '../store';
import { ThunkResult } from '../types';
import { TOGGLE_ACTIVITY } from './shared';

export const CHANGE_LANGUAGE = 'aiana/CHANGE_LANGUAGE';
export const CHANGE_THEME = 'aiana/CHANGE_THEME';
export const WINDOWS_LOCK = 'aiana/WINDOWS_LOCK';

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
