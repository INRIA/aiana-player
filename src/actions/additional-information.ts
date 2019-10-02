import { createAction } from 'redux-starter-kit';
import { IRawTrackExt } from '../utils/media';

export const setAdditionalInformationText = createAction<string>(
  'SET_ADDITIONAL_INFORMATION_TEXT'
);

export const addAdditionalInformationTrack = createAction<IRawTrackExt>(
  'ADD_ADDITIONAL_INFORMATION_TRACK'
);

export const updateActiveAdditionalInformationTrack = createAction<string>(
  'UPDATE_ACTIVE_ADDITIONAL_INFORMATION_TRACK'
);
