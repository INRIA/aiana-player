import { Reducer } from 'redux';
import {
  PLAYER_ELEMENT_MOUNTED,
  SET_SUBTITLE_TEXT,
  TOGGLE_FULLSCREEN,
  TOGGLE_NATIVE_CONTROLS,
  UPDATE_ACTIVE_TEXT_TRACK,
  UPDATE_TRACKS_LIST,
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
import { ITrack } from '../components/video/VideoTextTrack';
import {
  DEFAULT_NATIVE_CONTROLS,
  DEFAULT_PLAY_RATE,
  DEFAULT_VOLUME
} from '../constants';
import { IRawTextTrack } from '../utils/text-tracks';

export interface IPlayerState {
  autoPlay: boolean;

  subtitleText: string | undefined;

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
  readonly sourceTracks: ITrack[];
  readonly sources: ISource[];

  /**
   * HTMLMediaElement already parses vtt files and manage its own tracks state
   * living inside a TextTrackList. However, the list elements have some
   * properties that are unnecessary to us. The elements will also lose some of
   * the HTML attributes such as `default`.
   * `textTracks` is a collection of lightweight objects with properties from
   * `sources` and `sourceTracks`.
   */
  textTracks: IRawTextTrack[];

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
  sourceTracks: [
    {
      label: 'Default subtitles',
      src: 'http://localhost:3000/dev/subtitles.vtt'
    },
    {
      label: 'LOLSpanish subtitles',
      src: 'http://localhost:3000/dev/subtitles.1.vtt',
      srcLang: 'es'
    },
    {
      kind: 'captions',
      label: 'Captions',
      src: 'http://localhost:3000/dev/subtitles.vtt'
    }
  ],
  sources: [
    {
      src: 'https://d381hmu4snvm3e.cloudfront.net/videos/oPEWrYW520x4/SD.mp4',
      type: 'video/mp4'
    }
  ],
  subtitleText: undefined,
  textTracks: [],
  videoElement: null,
  volume: DEFAULT_VOLUME
};

const player: Reducer = (state: IPlayerState = initialState, action) => {
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
    case UPDATE_TRACKS_LIST:
      return {
        ...state,
        textTracks: action.textTracks
      };
    case UPDATE_ACTIVE_TEXT_TRACK:
      const textTracks = state.textTracks.map((track) => {
        if (track.label === action.activeTrack) {
          return { ...track, active: true };
        }
        if (track.active === true) {
          return { ...track, active: false };
        }
        return { ...track };
      });

      return {
        ...state,
        textTracks
      };
    case SET_SUBTITLE_TEXT:
      return {
        ...state,
        subtitleText: action.subtitleText
      };
    default:
      return state;
  }
};

export default player;
