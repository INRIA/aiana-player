import { Reducer } from 'redux';
import {
  PLAYER_ELEMENT_MOUNTED,
  TOGGLE_FULLSCREEN,
  VIDEO_ELEMENT_MOUNTED,
  VIDEO_ELEMENT_UNMOUNTED,
  VIDEO_PAUSE,
  VIDEO_PLAY,
  VIDEO_PLAYBACK_RATE,
  VIDEO_TOGGLE_MUTE,
  VIDEO_VOLUME
} from '../actions/player';
import {
  DEFAULT_NATIVE_CONTROLS,
  DEFAULT_PLAY_RATE,
  DEFAULT_VOLUME
} from '../constants';

export interface IPlayerState {
  autoPlay: boolean;
  isFullscreen: boolean;
  isMuted: boolean;
  isPlaying: boolean;
  nativeControls: boolean;
  playbackRate: number;
  playerElement: HTMLElement | null;
  videoElement: HTMLVideoElement | null;
  volume: number;
}

const initialState: IPlayerState = {
  autoPlay: false,
  isFullscreen: false,
  isMuted: false,
  isPlaying: false,
  nativeControls: DEFAULT_NATIVE_CONTROLS,
  playbackRate: DEFAULT_PLAY_RATE,
  playerElement: null,
  videoElement: null,
  volume: DEFAULT_VOLUME
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
    case VIDEO_TOGGLE_MUTE:
      return {
        ...state,
        isMuted: action.isMuted
      };
    case VIDEO_VOLUME:
      return {
        ...state,
        volume: action.volume
      };
    default:
      return state;
  }
};

export default player;
