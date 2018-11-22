import { AnyAction } from 'redux';
import { ExtendedHTMLElement } from 'src/types';
import {
  enterFullscreen,
  exitFullscreen,
  isDocumentFullscreen
} from '../utils/fullscreen';
import { convertTimeRanges, IRawMetadataTrack } from '../utils/media';

export const TOGGLE_FULLSCREEN = 'aiana/TOGGLE_FULLSCREEN';
export const TOGGLE_FULLSCREEN_REQUESTED = 'aiana/TOGGLE_FULLSCREEN_REQUESTED';
export const PLAYER_ELEMENT_MOUNTED = 'aiana/PLAYER_ELEMENT_MOUNTED';
export const MEDIA_ELEMENT_MOUNTED = 'aiana/MEDIA_ELEMENT_MOUNTED';
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
export const SET_ADDITIONAL_INFOS_TEXT = 'aiana/SET_ADDITIONAL_INFOS_TEXT';
export const SET_BUFFERED_RANGES = 'aiana/SET_BUFFERED_RANGES';

export function updateBufferedRanges(timeRanges: TimeRanges): AnyAction {
  return {
    bufferedRanges: convertTimeRanges(timeRanges),
    type: SET_BUFFERED_RANGES
  };
}

export function setAdditionalInformationsText(text?: string): AnyAction {
  return {
    text,
    type: SET_ADDITIONAL_INFOS_TEXT
  };
}

// TODO: rename to add infos
export function addMetadataTrack(track: IRawMetadataTrack): AnyAction {
  return {
    track,
    type: ADD_METADATA_TRACK
  };
}

export function startSeeking(): AnyAction {
  return toggleSeek(true);
}

export function stopSeeking(): AnyAction {
  return toggleSeek(false);
}

function toggleSeek(isSeeking: boolean): AnyAction {
  return {
    isSeeking,
    type: MEDIA_SEEK_TOGGLE
  };
}

export function requestSeek(
  media: HTMLMediaElement,
  seekingTime: number
): AnyAction {
  media.currentTime = seekingTime;

  return {
    seekingTime,
    type: MEDIA_REQUEST_SEEK
  };
}

export function updateCurrentTime(currentTime: number): AnyAction {
  return {
    currentTime,
    type: MEDIA_UPDATE_TIME
  };
}

export function handleFullscreenChange(isFullscreen: boolean): AnyAction {
  return {
    isFullscreen,
    type: TOGGLE_FULLSCREEN
  };
}

export function handleToggleFullscreen(
  rootElement: ExtendedHTMLElement
): AnyAction {
  const shouldExitFullscreen = isDocumentFullscreen();

  if (shouldExitFullscreen) {
    exitFullscreen();
  } else {
    enterFullscreen(rootElement);
  }

  return {
    type: TOGGLE_FULLSCREEN_REQUESTED
  };
}

export function playerElementMounted(playerElement: HTMLElement): AnyAction {
  return {
    playerElement,
    type: PLAYER_ELEMENT_MOUNTED
  };
}

export function mediaElementMounted(mediaElement: HTMLMediaElement): AnyAction {
  return {
    mediaElement,
    type: MEDIA_ELEMENT_MOUNTED
  };
}

export function mediaElementUnounted(): AnyAction {
  return {
    type: MEDIA_ELEMENT_UNMOUNTED
  };
}

export function requestMediaPlay(media: HTMLMediaElement): AnyAction {
  media.play();

  return {
    type: MEDIA_REQUEST_PLAY
  };
}

export function playMedia(): AnyAction {
  return {
    isPlaying: true,
    type: MEDIA_PLAY
  };
}

export function requestMediaPause(media: HTMLMediaElement): AnyAction {
  media.pause();

  return {
    type: MEDIA_REQUEST_PAUSE
  };
}

export function pauseMedia(): AnyAction {
  return {
    isPlaying: false,
    type: MEDIA_PAUSE
  };
}

export function changePlaybackRate(
  media: HTMLMediaElement,
  playbackRate: number
): AnyAction {
  media.playbackRate = playbackRate;

  return {
    playbackRate,
    type: MEDIA_PLAYBACK_RATE
  };
}

export function requestChangeVolume(
  media: HTMLMediaElement,
  volume: number
): AnyAction {
  media.volume = volume;

  return {
    type: MEDIA_REQUEST_VOLUME_CHANGE,
    volume
  };
}

export function changeVolume(volume: number): AnyAction {
  return {
    type: MEDIA_VOLUME_CHANGE,
    volume
  };
}

export function muteMedia(media: HTMLMediaElement): AnyAction {
  media.muted = true;

  return {
    type: MEDIA_REQUEST_MUTE
  };
}

export function unmuteMedia(media: HTMLMediaElement): AnyAction {
  media.muted = false;

  return {
    type: MEDIA_REQUEST_UNMUTE
  };
}

export function toggleMute(isMuted: boolean): AnyAction {
  return {
    isMuted,
    type: MEDIA_TOGGLE_MUTE
  };
}

export function updateMediaDuration(duration: number): AnyAction {
  return {
    duration,
    type: MEDIA_UPDATE_DURATION
  };
}
