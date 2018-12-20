import { AnyAction } from 'redux';
import { i18nInstance } from '../translations';
import { TOGGLE_ACTIVITY } from './shared';

export const CHANGE_LANGUAGE = 'aiana/CHANGE_LANGUAGE';
export const CHANGE_THEME = 'aiana/CHANGE_THEME';

export function changeCurrentLanguage(language: string): AnyAction {
  i18nInstance.changeLanguage(language);

  return {
    currentLanguage: language,
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
