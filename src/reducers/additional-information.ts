import { loadConfiguration } from '../actions/shared/configuration';
import { createReducer, PayloadAction } from 'redux-starter-kit';
import {
  addAdditionalInformationTrack,
  setAdditionalInformationText,
  updateActiveAdditionalInformationTrack
} from '../actions/additional-information';
import { IRawTrack } from '../utils/media';
import { DEFAULT_LANG } from '../constants/preferences';

export interface IAdditionalInformationTrack {
  label: string;
  src: string;
  srcLang: string;
}

export interface IAdditionalInformationState {
  tracks: IRawTrack[];
  language: string;
  sources: IAdditionalInformationTrack[];
  currentText?: string;
}

const initialState: IAdditionalInformationState = {
  tracks: [],
  language: DEFAULT_LANG,
  sources: []
};

export const additionalInformationReducer = createReducer(initialState, {
  [addAdditionalInformationTrack.type]: (
    state: IAdditionalInformationState,
    action: PayloadAction<IRawTrack>
  ) => {
    state.tracks.push(action.payload);
  },
  [setAdditionalInformationText.type]: (
    state: IAdditionalInformationState,
    action: PayloadAction<string | undefined>
  ) => {
    state.currentText = action.payload;
  },
  [updateActiveAdditionalInformationTrack.type]: (
    state: IAdditionalInformationState,
    action: PayloadAction<string>
  ) => {
    state.language = action.payload;
  },
  [loadConfiguration.type]: (state: IAdditionalInformationState, action) => ({
    ...state,
    ...action.payload.additionalInformation
  })
});

export function getSelectedTrack(
  state: IAdditionalInformationState
): IRawTrack | undefined {
  return state.tracks.find((track) => track.language === state.language);
}

export function getSelectedTrackLanguage(
  state: IAdditionalInformationState
): string {
  const selectedTrack = getSelectedTrack(state);
  return selectedTrack ? selectedTrack.language : '';
}

export default additionalInformationReducer;
