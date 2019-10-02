import { ITimeRange } from '../utils/media';
import { createAction } from 'redux-starter-kit';

export const TOGGLE_FULLSCREEN_REQUESTED = 'aiana/TOGGLE_FULLSCREEN_REQUESTED';
export const MEDIA_REQUEST_PAUSE = 'aiana/MEDIA_REQUEST_PAUSE';
export const MEDIA_REQUEST_PLAY = 'aiana/MEDIA_REQUEST_PLAY';

export const updateRating = createAction<number>('UPDATE_RATING');

export const updateBufferedRanges = createAction<ITimeRange>(
  'SET_BUFFERED_RANGES'
);

export const stopSeeking = createAction('MEDIA_SEEK_STOP');

export const seek = createAction<number>('MEDIA_SEEK');

export const setCurrentTime = createAction<number>('SET_MEDIA_CURRENT_TIME');

export const toggleFullscreenChangeAction = createAction<boolean>(
  'TOGGLE_FULLSCREEN'
);

export const playMedia = createAction('MEDIA_PLAY');

export const pauseMedia = createAction('MEDIA_PAUSE');

export const changePlaybackRate = createAction<number>('MEDIA_PLAYBACK_RATE');

export const changeVolume = createAction<number>('MEDIA_VOLUME_CHANGE');

export const toggleMute = createAction<boolean>('MEDIA_TOGGLE_MUTE');

export const updateMediaDuration = createAction<number>(
  'MEDIA_UPDATE_DURATION'
);
