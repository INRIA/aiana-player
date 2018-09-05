import { Dispatch } from 'redux';
import {
  enterFullscreen,
  exitFullscreen,
  hasFullscreenElement
} from '../utils/fullscreen';

export const TOGGLE_FULLSCREEN = 'aiana/TOGGLE_FULLSCREEN';
export const PLAYER_ELEMENT_MOUNTED = 'aiana/PLAYER_ELEMENT_MOUNTED';
export const VIDEO_ELEMENT_MOUNTED = 'aiana/VIDEO_ELEMENT_MOUNTED';
export const VIDEO_ELEMENT_UNMOUNTED = 'aiana/VIDEO_ELEMENT_UNMOUNTED';
export const VIDEO_PLAY = 'aiana/VIDEO_PLAY';
export const VIDEO_PAUSE = 'aiana/VIDEO_PAUSE';

function toggleFullscreen(isFullscreen: boolean) {
  return {
    isFullscreen,
    type: TOGGLE_FULLSCREEN
  };
}

export function playerElementMounted(playerElement: HTMLElement) {
  return {
    playerElement,
    type: PLAYER_ELEMENT_MOUNTED
  };
}

export function handleToggleFullscreen(element: HTMLElement): any {
  const shouldExitFullscreen: boolean = hasFullscreenElement();

  if (shouldExitFullscreen) {
    exitFullscreen();
  } else {
    enterFullscreen(element);
  }

  return (dispatch: Dispatch) => {
    dispatch(toggleFullscreen(shouldExitFullscreen));
  };
}

export function videoElementMounted(videoElement: HTMLVideoElement) {
  return {
    type: VIDEO_ELEMENT_MOUNTED,
    videoElement
  };
}

export function videoElementUnounted() {
  return {
    type: VIDEO_ELEMENT_UNMOUNTED
  };
}

export function playVideo(videoElement: HTMLVideoElement) {
  videoElement.play();
  return {
    type: VIDEO_PLAY
  };
}

export function pauseVideo(videoElement: HTMLVideoElement) {
  videoElement.pause();
  return {
    type: VIDEO_PAUSE
  };
}
