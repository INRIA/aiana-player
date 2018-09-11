import { Reducer } from 'redux';
import {
  PLAYER_ELEMENT_MOUNTED,
  TOGGLE_FULLSCREEN,
  VIDEO_ELEMENT_MOUNTED,
  VIDEO_ELEMENT_UNMOUNTED,
  VIDEO_PAUSE,
  VIDEO_PLAY,
  VIDEO_PLAYBACK_RATE
} from '../actions/player';
import { DEFAULT_NATIVE_CONTROLS, DEFAULT_PLAY_RATE } from '../constants';

export interface IPlayerState {
  isFullscreen: boolean;
  isPlaying: boolean;
  playbackRate: number;
  playerElement: HTMLElement | null;
  videoElement: HTMLVideoElement | null;
}

const initialState: IPlayerState = {
  isFullscreen: false,
  isPlaying: false,
  playbackRate: DEFAULT_PLAY_RATE,
  playerElement: null,
  videoElement: null
};

const player: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FULLSCREEN:
      return {
        ...state,
        isFullscreen: action.isFullscreen
      };
    case PLAYER_ELEMENT_MOUNTED:
      return {
        ...state,
        playerElement: action.playerElement
      };
    case VIDEO_ELEMENT_MOUNTED:
      return {
        ...state,
        videoElement: action.videoElement
      };
    case VIDEO_ELEMENT_UNMOUNTED:
      return {
        ...state,
        videoElement: null
      };
    case VIDEO_PLAY:
      return {
        ...state,
        isPlaying: true
      };
    case VIDEO_PAUSE:
      return {
        ...state,
        isPlaying: false
      };
    case VIDEO_PLAYBACK_RATE:
      return {
        ...state,
        playbackRate: action.playbackRate
      };
    default:
      return state;
  }
};

export default player;
