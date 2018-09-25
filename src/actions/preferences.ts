import { AnyAction } from 'redux';
import { i18nInstance } from '../translations';

export const CHANGE_LANGUAGE = 'aiana/CHANGE_LANGUAGE';
export const CHANGE_THEME = 'aiana/CHANGE_THEME';

export function changeLanguage(language: string): AnyAction {
  i18nInstance.changeLanguage(language);

  return {
    language,
    type: CHANGE_LANGUAGE
  };
}

export function changeCurrentTheme(themeName: string): AnyAction {
  return {
    themeName,
    type: CHANGE_THEME
  };
}
