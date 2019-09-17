import { IRawTrackExt } from '../utils/media';
import { createAction } from 'redux-starter-kit';

export const setSubtitlesText = createAction<string | undefined>(
  'SET_SUBTITLE_TEXT'
);

export const updateActiveSubtitles = createAction<string>(
  'UPDATE_ACTIVE_SUBTITLES_TRACK'
);

export const addSubtitlesTrack = createAction<IRawTrackExt>(
  'ADD_SUBTITLES_TRACK'
);

export const updateSubtitlesTracksList = createAction<IRawTrackExt[]>(
  'UPDATE_SUBTITLES_TRACKS_LIST'
);
