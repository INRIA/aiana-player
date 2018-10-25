import { Reducer } from 'redux';
import {
  ADD_CHAPTER_TRACK,
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
  SET_SUBTITLE_TEXT,
  TOGGLE_FULLSCREEN,
  TOGGLE_NATIVE_CONTROLS,
  UPDATE_ACTIVE_TEXT_TRACK,
  UPDATE_TRACKS_LIST
} from 'src/actions/player';
import { ISource } from 'src/components/video/VideoPlayer';
import { ITrack } from 'src/components/video/VideoTextTrack';
import { ExtendedHTMLElement } from 'src/types';
import { IRawChapterTrack, IRawTextTrack } from 'src/utils/media-tracks';
import {
  DEFAULT_NATIVE_CONTROLS,
  DEFAULT_PLAY_RATE,
  DEFAULT_VOLUME
} from '../constants';

export interface IPlayerState {
  autoPlay: boolean;

  /**
   * Chapters tracks are gathered asynchronously when their HTMLTrackElement
   * has successfuly loaded.
   */
  chaptersTracks: IRawChapterTrack[];

  /** The current position of the player, expressed in seconds */
  currentTime: number;

  /** Duration of the video expressed in seconds. */
  duration: number;
  isFullscreen: boolean;
  isMuted: boolean;
  isPlaying: boolean;

  isSeeking: boolean;

  mediaElement: HTMLMediaElement | null;

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
  playerElement: ExtendedHTMLElement | null;
  preload: string;

  seekingTime: number;

  readonly sources: ISource[];

  subtitleText: string | undefined;

  readonly subtitlesTracks: ITrack[];

  /**
   * HTMLMediaElement already parses vtt files and manage its own tracks state
   * living inside a TextTrackList. However, the list elements have some
   * properties that are unnecessary to us. The elements will also lose some of
   * the HTML attributes such as `default`.
   * `textTracks` is a collection of lightweight objects with properties from
   * `sources` and `sourceTracks`.
   */
  textTracks: IRawTextTrack[];

  /**
   * Volume level for audio portions of the media element.
   * It varies from 0 to 1.
   */
  volume: number;
}

const initialState: IPlayerState = {
  autoPlay: false,
  chaptersTracks: [],
  currentTime: 0,
  duration: 0,
  isFullscreen: false,
  isMuted: false,
  isPlaying: false,
  isSeeking: false,
  mediaElement: null,
  nativeControls: DEFAULT_NATIVE_CONTROLS,
  playbackRate: DEFAULT_PLAY_RATE,
  playerElement: null,
  preload: 'auto',
  seekingTime: 0,
  sources: [
    {
      src: 'https://d381hmu4snvm3e.cloudfront.net/videos/oPEWrYW520x4/SD.mp4',
      type: 'video/mp4'
    }
  ],
  subtitleText: undefined,
  subtitlesTracks: [
    {
      label: 'Default subtitles (English)',
      src: 'http://localhost:3000/dev/subtitles.vtt'
    },
    {
      label: 'Sous-titres',
      src: 'http://localhost:3000/dev/subtitles.1.vtt',
      srcLang: 'es'
    },
    {
      kind: 'captions',
      label: 'Captions',
      src: 'http://localhost:3000/dev/subtitles.vtt'
    },
    {
      kind: 'chapters',
      label: 'Chapters',
      src: 'http://localhost:3000/dev/chapters.en.vtt',
      srcLang: 'en'
    },
    {
      kind: 'chapters',
      label: 'Chapitres',
      src: 'http://localhost:3000/dev/chapters.fr.vtt',
      srcLang: 'fr'
    }
  ],
  textTracks: [],
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
    case MEDIA_ELEMENT_MOUNTED:
      return {
        ...state,
        mediaElement: action.mediaElement
      };
    case MEDIA_ELEMENT_UNMOUNTED:
      return {
        ...state,
        isPlaying: false,
        mediaElement: null
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
    case UPDATE_TRACKS_LIST:
      return {
        ...state,
        textTracks: action.textTracks
      };
    case UPDATE_ACTIVE_TEXT_TRACK:
      const textTracks = state.textTracks.map((track) => {
        if (track.label === action.textTrackLabel) {
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
    case ADD_CHAPTER_TRACK:
      const chaptersTracks = [].concat(
        state.chaptersTracks as any,
        action.chaptersTrack
      );

      return {
        ...state,
        chaptersTracks
      };
    default:
      return state;
  }
};

export default player;
