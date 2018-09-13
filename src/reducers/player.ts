import { Reducer } from 'redux';
import {
  PLAYER_ELEMENT_MOUNTED,
  TOGGLE_FULLSCREEN,
  TOGGLE_NATIVE_CONTROLS,
  VIDEO_ELEMENT_MOUNTED,
  VIDEO_ELEMENT_UNMOUNTED,
  VIDEO_PAUSE,
  VIDEO_PLAY,
  VIDEO_PLAYBACK_RATE,
  VIDEO_REQUEST_VOLUME_CHANGE,
  VIDEO_TOGGLE_MUTE,
  VIDEO_VOLUME_CHANGE
} from '../actions/player';
import { ISource } from '../components/video/VideoPlayer';
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
  sources: ISource[];
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
  sources: [
    {
      src: 'https://d381hmu4snvm3e.cloudfront.net/videos/w0z9Ik6mMj83/SD.mp4',
      type: 'video/mp4'
    }
  ],
  videoElement: null,
  volume: DEFAULT_VOLUME
};

const player: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_NATIVE_CONTROLS:
      return {
        ...state,
        nativeControls: action.nativeControls
      };
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
        isPlaying: false,
        videoElement: null
      };
    case VIDEO_PLAY:
    case VIDEO_PAUSE:
      return {
        ...state,
        isPlaying: action.isPlaying
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
    case VIDEO_REQUEST_VOLUME_CHANGE:
    case VIDEO_VOLUME_CHANGE:
      return {
        ...state,
        volume: action.volume
      };
    default:
      return state;
  }
};

export default player;
