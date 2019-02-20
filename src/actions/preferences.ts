import { AnyAction } from 'redux';
import { CDispatch } from '../store';
import i18n from '../translations';
import { ThunkResult } from '../types';
import { TOGGLE_ACTIVITY } from './shared';

export const CHANGE_LANGUAGE = 'aiana/CHANGE_LANGUAGE';
export const CHANGE_THEME = 'aiana/CHANGE_THEME';

export function changeCurrentLanguage(language: string): ThunkResult<void> {
  return (dispatch: CDispatch) => {
    i18n.changeLanguage(language).then(() => {
      dispatch(changeLanguage(language));
    });
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
