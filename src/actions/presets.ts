import cloneDeep from 'lodash.clonedeep';
import { IPreset } from '../reducers/presets';
import { ThunkResult } from '../types';
import { changeLanguage } from './preferences';
import { CDispatch } from '../store';
import { initialPreferencesState } from '../reducers/preferences';

export const CHANGE_ACTIVE_PRESET = 'aiana/CHANGE_ACTIVE_PRESET';

export function changeActivePreset(preset?: IPreset): ThunkResult<void> {
  return (dispatch: CDispatch) => {
    const safePreset = Object.assign(
      cloneDeep(initialPreferencesState),
      cloneDeep(preset)
    );

    dispatch(changeLanguage(safePreset.language));

    dispatch({
      payload: {
        preset: safePreset
      },
      type: CHANGE_ACTIVE_PRESET
    });
  };
}
