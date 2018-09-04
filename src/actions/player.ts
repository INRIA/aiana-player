import { Dispatch } from 'redux';
import {
  enterFullscreen,
  exitFullscreen,
  hasFullscreenElement
} from '../utils/fullscreen';

export const TOGGLE_FULLSCREEN = 'aiana/TOGGLE_FULLSCREEN';
export const PLAYER_ELEMENT_MOUNTED = 'aiana/PLAYER_ELEMENT_MOUNTED';

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
  if (hasFullscreenElement()) {
    exitFullscreen();
  } else {
    enterFullscreen(element);
  }

  return (dispatch: Dispatch) => {
    dispatch(toggleFullscreen(hasFullscreenElement()));
  };
}
