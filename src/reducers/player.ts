import { Reducer } from 'redux';
import {
  ADD_METADATA_TRACK,
  MEDIA_ELEMENT_MOUNTED,
  MEDIA_ELEMENT_UNMOUNTED,
  MEDIA_PAUSE,
  MEDIA_PLAY,
  MEDIA_PLAYBACK_RATE,
  MEDIA_REQUEST_SEEK,
  MEDIA_REQUEST_VOLUME_CHANGE,
  MEDIA_SEEK_TOGGLE,
  MEDIA_TOGGLE_MUTE,
  MEDIA_UPDATE_DURATION,
  MEDIA_UPDATE_TIME,
  MEDIA_VOLUME_CHANGE,
  PLAYER_ELEMENT_MOUNTED,
  SET_ADDITIONAL_INFOS_TEXT,
  SET_BUFFERED_RANGES,
  TOGGLE_FULLSCREEN,
  TOGGLE_NATIVE_CONTROLS
} from 'src/actions/player';
import { ITrack } from 'src/components/video/MediaSubtitlesTrack';
import { ISource } from 'src/components/video/VideoPlayer';
import { ExtendedHTMLElement } from 'src/types';
import { BufferedRanges, IRawMetadataTrack } from 'src/utils/media';
import {
  DEFAULT_AUTOLOAD,
  DEFAULT_NATIVE_CONTROLS,
  DEFAULT_PLAY_RATE,
  DEFAULT_VOLUME
} from '../constants';

export interface IPlayerState {
  additionalInformationsText?: string;
  readonly additionalInformationsTracks: ITrack[];

  autoPlay: boolean;

  bufferedRanges: BufferedRanges;

  /** The current position of the player, expressed in seconds */
  currentTime: number;

  /** Duration of the video expressed in seconds. */
  duration: number;
  isFullscreen: boolean;
  isMuted: boolean;
  isPlaying: boolean;

  isSeeking: boolean;

  mediaElement?: HTMLMediaElement;

  metadataTracks: IRawMetadataTrack[];

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
  playerElement?: ExtendedHTMLElement;
  preload: string;

  seekingTime: number;

  readonly sources: ISource[];

  /**
   * Volume level for audio portions of the media element.
   * It varies from 0 to 1.
   */
  volume: number;
}

const initialState: IPlayerState = {
  additionalInformationsTracks: [
    {
      kind: 'metadata',
      label: 'Additional info',
      src: 'http://localhost:3000/dev/additional.en.vtt',
      srcLang: 'en'
    }
  ],
  autoPlay: false,
  bufferedRanges: [],
  currentTime: 0,
  duration: 0,
  isFullscreen: false,
  isMuted: false,
  isPlaying: false,
  isSeeking: false,
  metadataTracks: [],
  nativeControls: DEFAULT_NATIVE_CONTROLS,
  playbackRate: DEFAULT_PLAY_RATE,
  preload: DEFAULT_AUTOLOAD,
  seekingTime: 0,
  sources: [
    {
      src: 'https://d381hmu4snvm3e.cloudfront.net/videos/oPEWrYW520x4/SD.mp4',
      type: 'video/mp4'
    }
  ],
  volume: DEFAULT_VOLUME
};

const player: Reducer = (state: IPlayerState = initialState, action) => {
  switch (action.type) {
    case SET_BUFFERED_RANGES:
      return {
        ...state,
        bufferedRanges: action.bufferedRanges
      };
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
    case MEDIA_ELEMENT_MOUNTED:
      return {
        ...state,
        mediaElement: action.mediaElement
      };
    case MEDIA_ELEMENT_UNMOUNTED:
      return {
        ...state,
        isPlaying: false,
        mediaElement: undefined
      };
    case MEDIA_PLAY:
    case MEDIA_PAUSE:
      return {
        ...state,
        isPlaying: action.isPlaying
      };
    case MEDIA_PLAYBACK_RATE:
      return {
        ...state,
        playbackRate: action.playbackRate
      };
    case MEDIA_TOGGLE_MUTE:
      return {
        ...state,
        isMuted: action.isMuted
      };
    case MEDIA_REQUEST_VOLUME_CHANGE:
    case MEDIA_VOLUME_CHANGE:
      return {
        ...state,
        volume: action.volume
      };
    case MEDIA_UPDATE_DURATION:
      return {
        ...state,
        duration: action.duration
      };
    case MEDIA_UPDATE_TIME:
      return {
        ...state,
        currentTime: action.currentTime
      };
    case MEDIA_REQUEST_SEEK:
      return {
        ...state,
        seekingTime: action.seekingTime
      };
    case MEDIA_SEEK_TOGGLE:
      const seekingTime = action.isSeeking ? state.seekingTime : 0;

      return {
        ...state,
        isSeeking: action.isSeeking,
        seekingTime
      };
    case SET_ADDITIONAL_INFOS_TEXT:
      return {
        ...state,
        additionalInformationsText: action.text
      };
    case ADD_METADATA_TRACK:
      const metadataTracks = [].concat(
        state.metadataTracks as any,
        action.track
      );

      return {
        ...state,
        metadataTracks
      };
    default:
      return state;
  }
};

export default player;
