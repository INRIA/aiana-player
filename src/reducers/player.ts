import { Reducer } from 'redux';
import {
  ADD_METADATA_TRACK,
  MEDIA_SOURCE_UPDATED,
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
  SET_ADDITIONAL_INFO_TEXT,
  SET_BUFFERED_RANGES,
  TOGGLE_FULLSCREEN
} from '../actions/player';
import { LOAD_CONFIGURATION } from '../actions/shared';
import { ITrack } from '../components/video/MediaSubtitlesTrack';
import {
  DEFAULT_MUTED,
  DEFAULT_PLAYBACK_RATE,
  DEFAULT_PRELOAD,
  DEFAULT_VOLUME,
  DEFAULT_AUTOPLAY
} from '../constants/player';
import { ExtendedHTMLElement, IStdAction } from '../types';
import { BufferedRanges, IRawMetadataTrack } from '../utils/media';
import { CHANGE_MEDIA_SOURCE } from '../actions/preferences';

export interface IPlayerState {
  additionalInformationText?: string;
  additionalInformationTracks: ITrack[];
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
   * The current rate of speed for the media resource to play. This speed is
   * expressed as a multiple of the normal speed of the media resource.
   */
  playbackRate: number;
  playerElement?: ExtendedHTMLElement;
  poster?: string;
  preload: string;
  seekingTime: number;
  sources: ISource[];

  /**
   * Volume level for audio portions of the media element.
   * It varies from 0 to 1.
   */
  volume: number;
}

export interface ISource {
  label: string;
  type?: string;
  selected?: boolean;
  src: string;
}

const initialState: IPlayerState = {
  additionalInformationTracks: [],
  autoPlay: DEFAULT_AUTOPLAY,
  bufferedRanges: [],
  currentTime: 0,
  duration: 0,
  isFullscreen: false,
  isMuted: DEFAULT_MUTED,
  isPlaying: false,
  isSeeking: false,
  metadataTracks: [],
  playbackRate: DEFAULT_PLAYBACK_RATE,
  preload: DEFAULT_PRELOAD,
  seekingTime: 0,
  sources: [],
  volume: DEFAULT_VOLUME
};

const player: Reducer<IPlayerState, IStdAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_BUFFERED_RANGES:
      return {
        ...state,
        bufferedRanges: action.payload.bufferedRanges
      };
    case TOGGLE_FULLSCREEN:
      return {
        ...state,
        isFullscreen: action.payload.isFullscreen
      };
    case PLAYER_ELEMENT_MOUNTED:
      return {
        ...state,
        playerElement: action.payload.playerElement
      };
    case MEDIA_SOURCE_UPDATED:
      return {
        ...state,
        mediaElement: action.payload.mediaElement
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
        isPlaying: action.payload.isPlaying
      };
    case MEDIA_PLAYBACK_RATE:
      return {
        ...state,
        playbackRate: action.payload.playbackRate
      };
    case MEDIA_TOGGLE_MUTE:
      return {
        ...state,
        isMuted: action.payload.isMuted
      };
    case MEDIA_REQUEST_VOLUME_CHANGE:
    case MEDIA_VOLUME_CHANGE:
      return {
        ...state,
        volume: action.payload.volume
      };
    case MEDIA_UPDATE_DURATION:
      return {
        ...state,
        duration: action.payload.duration
      };
    case MEDIA_UPDATE_TIME:
      return {
        ...state,
        currentTime: action.payload.currentTime
      };
    case MEDIA_REQUEST_SEEK:
      return {
        ...state,
        seekingTime: action.payload.seekingTime
      };
    case MEDIA_SEEK_TOGGLE:
      return {
        ...state,
        isSeeking: action.payload.isSeeking,
        seekingTime: action.payload.isSeeking ? state.seekingTime : 0
      };
    case SET_ADDITIONAL_INFO_TEXT:
      return {
        ...state,
        additionalInformationText: action.payload.text
      };
    case ADD_METADATA_TRACK:
      const metadataTracks = [].concat(
        state.metadataTracks as any,
        action.payload.track
      );

      return {
        ...state,
        metadataTracks
      };
    case LOAD_CONFIGURATION:
      return {
        ...state,
        ...action.payload.player
      };
    case CHANGE_MEDIA_SOURCE: {
      const sources = state.sources.map((source: ISource) => {
        return {
          ...source,
          selected: source.src === action.payload.mediaSource
        };
      });
      return {
        ...state,
        sources
      };
    }
    default:
      return state;
  }
};

export default player;

export function isSelectedSource(source: ISource): boolean {
  return source.selected === true;
}

export function getSelectedMediaSource(sources: ISource[]) {
  return sources.find(isSelectedSource);
}
