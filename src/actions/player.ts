import { ExtendedHTMLElement, ThunkResult, IStdAction } from '../types';
import {
  enterFullscreen,
  exitFullscreen,
  isDocumentFullscreen
} from '../utils/fullscreen';
import { IRawTrackExt, ITimeRange } from '../utils/media';
import { createAction } from 'redux-starter-kit';

export const TOGGLE_FULLSCREEN_REQUESTED = 'aiana/TOGGLE_FULLSCREEN_REQUESTED';
export const MEDIA_REQUEST_MUTE = 'aiana/MEDIA_REQUEST_MUTE';
export const MEDIA_REQUEST_UNMUTE = 'aiana/MEDIA_REQUEST_UNMUTE';
export const MEDIA_REQUEST_PAUSE = 'aiana/MEDIA_REQUEST_PAUSE';
export const MEDIA_REQUEST_PLAY = 'aiana/MEDIA_REQUEST_PLAY';

export const updateRating = createAction<number>('UPDATE_RATING');

export const updateBufferedRanges = createAction<ITimeRange>(
  'SET_BUFFERED_RANGES'
);

export const setAdditionalInformationText = createAction<string>(
  'SET_ADDITIONAL_INFO_TEXT'
);

export const addAdditionalInformationTrack = createAction<IRawTrackExt>(
  'ADD_METADATA_TRACK'
);

export const startSeeking = createAction('MEDIA_SEEK_START');

export const stopSeeking = createAction('MEDIA_SEEK_STOP');

export function requestSeek(
  mediaSelector: string,
  seekingTime: number
): IStdAction {
  const media = document.querySelector(mediaSelector) as HTMLMediaElement;

  if (media) {
    media.currentTime = seekingTime;
  }

  return seek(seekingTime);
}

export const seek = createAction<number>('MEDIA_REQUEST_SEEK');

export const setCurrentTime = createAction<number>('SET_MEDIA_CURRENT_TIME');

export const toggleFullscreenChangeAction = createAction<boolean>(
  'TOGGLE_FULLSCREEN'
);

// FIXME: should just be a helper, not an action creator.
export function toggleFullscreen(selector: string): ThunkResult<void> {
  return () => {
    if (isDocumentFullscreen()) {
      exitFullscreen();
    } else {
      const el = document.querySelector(selector);
      if (el) {
        enterFullscreen(el as ExtendedHTMLElement);
      }
    }
  };
}

export function requestMediaPlay(mediaSelector: string): ThunkResult<void> {
  return (dispatch) => {
    dispatch({ type: MEDIA_REQUEST_PLAY });
    const media = document.querySelector(mediaSelector) as HTMLMediaElement;
    if (media) {
      media.play().then(() => {
        dispatch(playMedia());
      });
    } else {
      dispatch(playMedia());
    }
  };
}

export const playMedia = createAction('MEDIA_PLAY');

export function requestMediaPause(mediaSelector: string): ThunkResult<void> {
  return (dispatch) => {
    dispatch({ type: MEDIA_REQUEST_PAUSE });
    const media = document.querySelector(mediaSelector) as HTMLMediaElement;
    if (media) {
      media.pause();
    }
    dispatch(pauseMedia());
  };
}

export const pauseMedia = createAction('MEDIA_PAUSE');

export const changePlaybackRate = createAction<number>('MEDIA_PLAYBACK_RATE');

export const changeVolume = createAction<number>('MEDIA_VOLUME_CHANGE');

export function muteMedia(mediaSelector: string): IStdAction {
  const media = document.querySelector(mediaSelector) as HTMLMediaElement;

  if (media) {
    media.muted = true;
  }

  return {
    payload: null,
    type: MEDIA_REQUEST_MUTE
  };
}

export function unmuteMedia(mediaSelector: string): IStdAction {
  const media = document.querySelector(mediaSelector) as HTMLMediaElement;

  if (media) {
    media.muted = false;
  }

  return {
    payload: null,
    type: MEDIA_REQUEST_UNMUTE
  };
}

export const toggleMute = createAction('MEDIA_TOGGLE_MUTE');

export const updateMediaDuration = createAction<number>(
  'MEDIA_UPDATE_DURATION'
);
