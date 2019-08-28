import { IRawSubtitlesTrack } from '../utils/media';
import { createAction } from 'redux-starter-kit';

export const setSubtitlesText = createAction<string | undefined>(
  'SET_SUBTITLE_TEXT'
);

export const updateActiveSubtitles = createAction<string>(
  'UPDATE_ACTIVE_SUBTITLES_TRACK'
);

export const addSubtitlesTrack = createAction<IRawSubtitlesTrack>(
  'ADD_SUBTITLES_TRACK'
);

export const updateSubtitlesTracksList = createAction<IRawSubtitlesTrack[]>(
  'UPDATE_SUBTITLES_TRACKS_LIST'
);
