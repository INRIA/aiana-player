import { Reducer } from 'redux';
import { CHANGE_LANGUAGE } from '../actions/preferences';
import { AVAILABLE_LANGUAGES, DEFAULT_LANG } from '../constants';

export interface IPreferencesState {
  availableLanguages: string[];
  language: string;
}

const initialState: IPreferencesState = {
  availableLanguages: AVAILABLE_LANGUAGES,
  language: DEFAULT_LANG
};

const preferences: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.language
      };
    default:
      return state;
  }
};

export default preferences;
