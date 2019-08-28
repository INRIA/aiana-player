import cloneDeep from 'lodash.clonedeep';
import { IPreset } from '../reducers/presets';
import { ThunkResult } from '../types';
import { changeLanguage } from './preferences';
import { CDispatch } from '../store';
import { initialPreferencesState } from '../constants/default-preferences-state';
import { createAction } from 'redux-starter-kit';

export function changeActivePreset(preset?: IPreset): ThunkResult<void> {
  return (dispatch: CDispatch) => {
    const safePreset = Object.assign(
      cloneDeep(initialPreferencesState),
      cloneDeep(preset)
    );

    dispatch(changeLanguage(safePreset.language));
    dispatch(updateActivePreset(safePreset));
  };
}

export const updateActivePreset = createAction<IPreset>('CHANGE_ACTIVE_PRESET');
