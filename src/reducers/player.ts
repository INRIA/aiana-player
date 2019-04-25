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
  SET_ADDITIONAL_INFO_TEXT,
  SET_BUFFERED_RANGES,
  TOGGLE_FULLSCREEN
} from '../actions/player';
import { LOAD_CONFIGURATION } from '../actions/shared';
import { ITrack } from '../components/video/MediaSubtitlesTrack';
import { ISource } from '../components/video/VideoPlayer';
import {
  DEFAULT_MUTED,
  DEFAULT_PLAYBACK_RATE,
  DEFAULT_PRELOAD,
  DEFAULT_VOLUME
} from '../constants';
import { ExtendedHTMLElement } from '../types';
import { BufferedRanges, IRawMetadataTrack } from '../utils/media';

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

const initialState: IPlayerState = {
  additionalInformationTracks: [],
  autoPlay: false,
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

const player: Reducer = (state: IPlayerState = initialState, action) => {
  switch (action.type) {
    case SET_BUFFERED_RANGES:
      return {
        ...state,
        bufferedRanges: action.bufferedRanges
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
      return {
        ...state,
        isSeeking: action.isSeeking,
        seekingTime: action.isSeeking ? state.seekingTime : 0
      };
    case SET_ADDITIONAL_INFO_TEXT:
      return {
        ...state,
        additionalInformationText: action.text
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
    case LOAD_CONFIGURATION:
      return {
        ...state,
        ...action.player
      };
    default:
      return state;
  }
};

export default player;
