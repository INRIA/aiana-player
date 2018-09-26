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
  VIDEO_SEEK_TOGGLE,
  VIDEO_TOGGLE_MUTE,
  VIDEO_UPDATE_DURATION,
  VIDEO_UPDATE_TIME,
  VIDEO_VOLUME_CHANGE
} from '../actions/player';
import { ISource } from '../components/video/VideoPlayer';
import { ITrack } from '../components/video/VideoTrack';
import {
  DEFAULT_NATIVE_CONTROLS,
  DEFAULT_PLAY_RATE,
  DEFAULT_VOLUME
} from '../constants';

export interface IPlayerState {
  autoPlay: boolean;

  tracks: ITrack[];

  /** The current position of the player, expressed in seconds */
  currentTime: number;

  /** Duration of the video expressed in seconds. */
  duration: number;
  isFullscreen: boolean;
  isMuted: boolean;
  isPlaying: boolean;

  isSeeking: boolean;

  /**
   * Determines if the video HTML element should use its own controls or those
   * provided by Aiana
   */
  nativeControls: boolean;

  /**
   * The current rate of speed for the media resource to play. This speed is
   * expressed as a multiple of the normal speed of the media resource.
   */
  playbackRate: number;
  playerElement: HTMLElement | null;
  preload: string;
  sources: ISource[];
  videoElement: HTMLVideoElement | null;

  /**
   * Volume level for audio portions of the media element.
   * It varies from 0 to 1.
   */
  volume: number;
}

const initialState: IPlayerState = {
  autoPlay: false,
  currentTime: 0,
  duration: 0,
  isFullscreen: false,
  isMuted: false,
  isPlaying: false,
  isSeeking: false,
  nativeControls: DEFAULT_NATIVE_CONTROLS,
  playbackRate: DEFAULT_PLAY_RATE,
  playerElement: null,
  preload: 'auto',
  sources: [
    {
      src: 'https://d381hmu4snvm3e.cloudfront.net/videos/oPEWrYW520x4/SD.mp4',
      type: 'video/mp4'
    }
  ],
  tracks: [
    {
      isDefault: true,
      src: 'http://localhost:3000/dev/subtitles.vtt'
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
    case VIDEO_UPDATE_DURATION:
      return {
        ...state,
        duration: action.duration
      };
    case VIDEO_UPDATE_TIME:
      return {
        ...state,
        currentTime: action.currentTime
      };
    case VIDEO_SEEK_TOGGLE:
      return {
        ...state,
        isSeeking: action.isSeeking
      };
    default:
      return state;
  }
};

export default player;
