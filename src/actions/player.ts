import { ExtendedHTMLElement, ThunkResult, IStdAction } from '../types';
import {
  enterFullscreen,
  exitFullscreen,
  isDocumentFullscreen
} from '../utils/fullscreen';
import { convertTimeRanges, IRawMetadataTrack } from '../utils/media';

export const TOGGLE_FULLSCREEN = 'aiana/TOGGLE_FULLSCREEN';
export const TOGGLE_FULLSCREEN_REQUESTED = 'aiana/TOGGLE_FULLSCREEN_REQUESTED';
export const MEDIA_SOURCE_UPDATED = 'aiana/MEDIA_SOURCE_UPDATED';
export const MEDIA_ELEMENT_UNMOUNTED = 'aiana/MEDIA_ELEMENT_UNMOUNTED';
export const MEDIA_REQUEST_MUTE = 'aiana/MEDIA_REQUEST_MUTE';
export const MEDIA_REQUEST_UNMUTE = 'aiana/MEDIA_REQUEST_UNMUTE';
export const MEDIA_TOGGLE_MUTE = 'aiana/MEDIA_TOGGLE_MUTE';
export const MEDIA_PLAY = 'aiana/MEDIA_PLAY';
export const MEDIA_PAUSE = 'aiana/MEDIA_PAUSE';
export const MEDIA_PLAYBACK_RATE = 'aiana/MEDIA_PLAYBACK_RATE';
export const MEDIA_REQUEST_PAUSE = 'aiana/MEDIA_REQUEST_PAUSE';
export const MEDIA_REQUEST_PLAY = 'aiana/MEDIA_REQUEST_PLAY';
export const MEDIA_REQUEST_VOLUME_CHANGE = 'aiana/REQUEST_VOLUME_CHANGE';
export const MEDIA_UPDATE_DURATION = 'aiana/UPDATE_DURATION';
export const MEDIA_VOLUME_CHANGE = 'aiana/VOLUME_CHANGE';
export const MEDIA_UPDATE_TIME = 'aiana/UPDATE_TIME';
export const MEDIA_REQUEST_SEEK = 'aiana/MEDIA_REQUEST_SEEK';
export const MEDIA_SEEK_TOGGLE = 'aiana/MEDIA_SEEK_TOGGLE';
export const ADD_METADATA_TRACK = 'aiana/ADD_METADATA_TRACK';
export const SET_ADDITIONAL_INFO_TEXT = 'aiana/SET_ADDITIONAL_INFO_TEXT';
export const SET_BUFFERED_RANGES = 'aiana/SET_BUFFERED_RANGES';

export const UPDATE_RATING = 'aiana/UPDATE_RATING';
export function updateRating(rating: number): IStdAction {
  return {
    payload: {
      rating
    },
    type: UPDATE_RATING
  };
}

export function updateBufferedRanges(timeRanges: TimeRanges): IStdAction {
  return {
    payload: {
      bufferedRanges: convertTimeRanges(timeRanges)
    },
    type: SET_BUFFERED_RANGES
  };
}

export function setAdditionalInformationText(text?: string): IStdAction {
  return {
    payload: {
      text
    },
    type: SET_ADDITIONAL_INFO_TEXT
  };
}

export function addAdditionalInformationTrack(
  track: IRawMetadataTrack
): IStdAction {
  return {
    payload: {
      track
    },
    type: ADD_METADATA_TRACK
  };
}

export function startSeeking(): IStdAction {
  return toggleSeek(true);
}

export function stopSeeking(): IStdAction {
  return toggleSeek(false);
}

function toggleSeek(isSeeking: boolean): IStdAction {
  return {
    payload: {
      isSeeking
    },
    type: MEDIA_SEEK_TOGGLE
  };
}

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

function seek(seekingTime: number): IStdAction {
  return {
    payload: {
      seekingTime
    },
    type: MEDIA_REQUEST_SEEK
  };
}

export function updateCurrentTime(currentTime: number): IStdAction {
  return {
    payload: {
      currentTime
    },
    type: MEDIA_UPDATE_TIME
  };
}

export function handleFullscreenChange(isFullscreen: boolean): IStdAction {
  return {
    payload: {
      isFullscreen
    },
    type: TOGGLE_FULLSCREEN
  };
}

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

function playMedia(): IStdAction {
  return {
    payload: {
      isPlaying: true
    },
    type: MEDIA_PLAY
  };
}

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

function pauseMedia(): IStdAction {
  return {
    payload: {
      isPlaying: false
    },
    type: MEDIA_PAUSE
  };
}

export function changePlaybackRate(
  mediaSelector: string,
  playbackRate: number
): IStdAction {
  const media = document.querySelector(mediaSelector) as HTMLMediaElement;

  if (media) {
    media.playbackRate = playbackRate;
  }

  return {
    payload: {
      playbackRate
    },
    type: MEDIA_PLAYBACK_RATE
  };
}

export function requestChangeVolume(
  mediaSelector: string,
  volume: number
): IStdAction {
  const media = document.querySelector(mediaSelector) as HTMLMediaElement;

  if (media) {
    media.volume = volume;
  }

  return {
    payload: {
      volume
    },
    type: MEDIA_REQUEST_VOLUME_CHANGE
  };
}

export function changeVolume(volume: number): IStdAction {
  return {
    payload: {
      volume
    },
    type: MEDIA_VOLUME_CHANGE
  };
}

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

export function toggleMute(isMuted: boolean): IStdAction {
  return {
    payload: {
      isMuted
    },
    type: MEDIA_TOGGLE_MUTE
  };
}

export function updateMediaDuration(duration: number): IStdAction {
  return {
    payload: {
      duration
    },
    type: MEDIA_UPDATE_DURATION
  };
}
