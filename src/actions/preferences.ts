import i18n from '../i18n';
import cloneDeep from 'lodash.clonedeep';
import { CDispatch } from '../store';
import { ThunkResult } from '../types';
import { IPreferencesState } from '../reducers/preferences';
import { initialPreferencesState } from '../constants/default-preferences-state';
import { createAction } from 'redux-starter-kit';

export const CHANGE_WIDGET_VISIBILITY = 'aiana/CHANGE_WIDGET_VISIBILITY';

export const importPreferencesAction = createAction('IMPORT_PREFERENCES');

export const exportPreferences = createAction('EXPORT_PREFERENCES');

export const changeMediaSource = createAction<string>('CHANGE_MEDIA_SOURCE');

export const updateLineHeight = createAction<number>('UPDATE_LINE_HEIGHT');

export const changeActiveTheme = createAction<string>('CHANGE_THEME');

export const changeUILanguage = createAction<string>('CHANGE_LANGUAGE');

export function importPreferences(
  preferences: Partial<IPreferencesState>
): ThunkResult<void> {
  return (dispatch) => {
    const mergedPreferences = Object.assign(
      cloneDeep(initialPreferencesState),
      cloneDeep(preferences)
    );

    dispatch(changeLanguage(mergedPreferences.language));
    dispatch(importPreferencesAction(mergedPreferences));
  };
}

export const toggleFontUppercase = createAction('TOGGLE_TEXT_UPPERCASE');

export const toggleTextHighlighting = createAction('CHANGE_TEXT_HIGHLIGHTING');

export const updateFontSizeMultiplier = createAction<number>(
  'UPDATE_FONT_SIZE_MULTIPLIER'
);

export const updateActiveFontFace = createAction<string>(
  'UPDATE_ACTIVE_FONT_FACE'
);

export const toggleWidgetVisibility = createAction<string>(
  'TOGGLE_WIDGET_VISIBILITY'
);

export const setWidgetsLock = createAction<boolean>('WIDGETS_LOCK');

export function changeLanguage(language: string): ThunkResult<void> {
  return async (dispatch: CDispatch) => {
    await i18n.changeLanguage(language);
    dispatch(changeUILanguage(language));
  };
}
