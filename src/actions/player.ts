import { AnyAction } from 'redux';
import {
  enterFullscreen,
  exitFullscreen,
  isDocumentFullscreen
} from '../utils/fullscreen';
import { IRawChapterTrack, IRawTextTrack } from '../utils/media-tracks';

export const TOGGLE_NATIVE_CONTROLS = 'aiana/TOGGLE_NATIVE_CONTROLS';
export const TOGGLE_FULLSCREEN = 'aiana/TOGGLE_FULLSCREEN';
export const TOGGLE_FULLSCREEN_REQUESTED = 'aiana/TOGGLE_FULLSCREEN_REQUESTED';
export const PLAYER_ELEMENT_MOUNTED = 'aiana/PLAYER_ELEMENT_MOUNTED';
export const VIDEO_ELEMENT_MOUNTED = 'aiana/VIDEO_ELEMENT_MOUNTED';
export const VIDEO_ELEMENT_UNMOUNTED = 'aiana/VIDEO_ELEMENT_UNMOUNTED';
export const VIDEO_REQUEST_MUTE = 'aiana/VIDEO_REQUEST_MUTE';
export const VIDEO_REQUEST_UNMUTE = 'aiana/VIDEO_REQUEST_UNMUTE';
export const VIDEO_TOGGLE_MUTE = 'aiana/VIDEO_TOGGLE_MUTE';
export const VIDEO_PLAY = 'aiana/VIDEO_PLAY';
export const VIDEO_PAUSE = 'aiana/VIDEO_PAUSE';
export const VIDEO_PLAYBACK_RATE = 'aiana/VIDEO_PLAYBACK_RATE';
export const VIDEO_REQUEST_PAUSE = 'aiana/VIDEO_REQUEST_PAUSE';
export const VIDEO_REQUEST_PLAY = 'aiana/VIDEO_REQUEST_PLAY';
export const VIDEO_REQUEST_VOLUME_CHANGE = 'aiana/REQUEST_VOLUME_CHANGE';
export const VIDEO_UPDATE_DURATION = 'aiana/UPDATE_DURATION';
export const VIDEO_VOLUME_CHANGE = 'aiana/VOLUME_CHANGE';
export const VIDEO_UPDATE_TIME = 'aiana/UPDATE_TIME';
export const VIDEO_REQUEST_SEEK = 'aiana/VIDEO_REQUEST_SEEK';
export const VIDEO_SEEK_TOGGLE = 'aiana/VIDEO_SEEK_TOGGLE';
export const UPDATE_TRACKS_LIST = 'aiana/CHANGE_TRACKS_LIST';
export const UPDATE_ACTIVE_TEXT_TRACK = 'aiana/UPDATE_ACTIVE_TEXT_TRACK';

export const SET_SUBTITLE_TEXT = 'aiana/SET_SUBTITLE_TEXT';
export const ADD_CHAPTER_TRACK = 'aiana/ADD_CHAPTER_TRACK';

export function addChaptersTrack(chaptersTrack: IRawChapterTrack): AnyAction {
  return {
    chaptersTrack,
    type: ADD_CHAPTER_TRACK
  };
}

export function setSubtitleText(text: string | undefined): AnyAction {
  return {
    subtitleText: text,
    type: SET_SUBTITLE_TEXT
  };
}

export function updateActiveTextTrack(textTrackLabel: string): AnyAction {
  return {
    activeTrack: textTrackLabel,
    type: UPDATE_ACTIVE_TEXT_TRACK
  };
}

export function updateTracksList(textTracks: IRawTextTrack[]): AnyAction {
  return {
    textTracks,
    type: UPDATE_TRACKS_LIST
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
    type: VIDEO_SEEK_TOGGLE
  };
}

export function requestSeek(
  video: HTMLVideoElement,
  seekingTime: number
): AnyAction {
  video.currentTime = seekingTime;

  return {
    seekingTime,
    type: VIDEO_REQUEST_SEEK
  };
}

export function updateCurrentTime(currentTime: number): AnyAction {
  return {
    currentTime,
    type: VIDEO_UPDATE_TIME
  };
}

export function toggleNativeControls(nativeControls: boolean): AnyAction {
  return {
    nativeControls,
    type: TOGGLE_NATIVE_CONTROLS
  };
}

export function handleFullscreenChange(isFullscreen: boolean): AnyAction {
  return {
    isFullscreen,
    type: TOGGLE_FULLSCREEN
  };
}

export function handleToggleFullscreen(rootElement: HTMLElement): AnyAction {
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

export function videoElementMounted(videoElement: HTMLVideoElement): AnyAction {
  return {
    type: VIDEO_ELEMENT_MOUNTED,
    videoElement
  };
}

export function videoElementUnounted(): AnyAction {
  return {
    type: VIDEO_ELEMENT_UNMOUNTED
  };
}

export function requestVideoPlay(video: HTMLVideoElement): AnyAction {
  video.play();

  return {
    type: VIDEO_REQUEST_PLAY
  };
}

export function playVideo(): AnyAction {
  return {
    isPlaying: true,
    type: VIDEO_PLAY
  };
}

export function requestVideoPause(video: HTMLVideoElement): AnyAction {
  video.pause();

  return {
    type: VIDEO_REQUEST_PAUSE
  };
}

export function pauseVideo(): AnyAction {
  return {
    isPlaying: false,
    type: VIDEO_PAUSE
  };
}

export function changePlaybackRate(
  video: HTMLVideoElement,
  playbackRate: number
): AnyAction {
  video.playbackRate = playbackRate;

  return {
    playbackRate,
    type: VIDEO_PLAYBACK_RATE
  };
}

export function requestChangeVolume(
  video: HTMLVideoElement,
  volume: number
): AnyAction {
  video.volume = volume;

  return {
    type: VIDEO_REQUEST_VOLUME_CHANGE,
    volume
  };
}

export function changeVolume(volume: number): AnyAction {
  return {
    type: VIDEO_VOLUME_CHANGE,
    volume
  };
}

export function muteVideo(video: HTMLVideoElement): AnyAction {
  video.muted = true;

  return {
    type: VIDEO_REQUEST_MUTE
  };
}

export function unmuteVideo(video: HTMLVideoElement): AnyAction {
  video.muted = false;

  return {
    type: VIDEO_REQUEST_UNMUTE
  };
}

export function toggleMute(isMuted: boolean): AnyAction {
  return {
    isMuted,
    type: VIDEO_TOGGLE_MUTE
  };
}

export function updateVideoDuration(duration: number): AnyAction {
  return {
    duration,
    type: VIDEO_UPDATE_DURATION
  };
}
