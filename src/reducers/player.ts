import { DeepPartial } from 'redux';
import {
  updateRating,
  updateBufferedRanges,
  stopSeeking,
  seek,
  setCurrentTime,
  toggleFullscreenChangeAction,
  playMedia,
  pauseMedia,
  updateMediaDuration,
  changeVolume,
  toggleMute,
  changePlaybackRate
} from '../actions/player';
import { loadConfiguration } from '../actions/shared/configuration';
import {
  DEFAULT_MUTED,
  DEFAULT_PLAYBACK_RATE,
  DEFAULT_PRELOAD,
  DEFAULT_VOLUME,
  DEFAULT_AUTOPLAY
} from '../constants/player';
import { ITimeRange } from '../utils/media';
import { changeMediaSource } from '../actions/preferences';
import { safeDump, safeLoad } from 'js-yaml';
import { cloneDeep } from 'lodash';
import { APP_ROOT_SELECTOR } from '../constants';
import { createReducer, PayloadAction } from 'redux-starter-kit';

export interface IPlayerState {
  autoPlay: boolean;
  bufferedRanges: ITimeRange[];

  /** The current position of the player, expressed in seconds */
  currentTime: number;

  /** Duration of the video expressed in seconds. */
  duration: number;
  isFullscreen: boolean;
  isMuted: boolean;
  isPlaying: boolean;

  isSeeking: boolean;

  mediaId: string;

  /**
   * The current rate of speed for the media resource to play. This speed is
   * expressed as a multiple of the normal speed of the media resource.
   */
  playbackRate: number;
  playerSelector: string;
  poster?: string;
  preload: string;
  rating?: number;
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

export const initialPlayerState: IPlayerState = {
  autoPlay: DEFAULT_AUTOPLAY,
  bufferedRanges: [],
  currentTime: 0,
  duration: 0,
  isFullscreen: false,
  isMuted: DEFAULT_MUTED,
  isPlaying: false,
  isSeeking: false,
  mediaId: '__unset__',
  playbackRate: DEFAULT_PLAYBACK_RATE,
  playerSelector: APP_ROOT_SELECTOR,
  preload: DEFAULT_PRELOAD,
  rating: 0,
  seekingTime: 0,
  sources: [],
  volume: DEFAULT_VOLUME
};

export const playerReducer = createReducer(initialPlayerState, {
  [updateRating.type]: (state: IPlayerState, action: PayloadAction<number>) => {
    state.rating = action.payload;
  },
  [updateBufferedRanges.type]: (
    state: IPlayerState,
    action: PayloadAction<ITimeRange[]>
  ) => {
    state.bufferedRanges = action.payload;
  },
  [toggleFullscreenChangeAction.type]: (
    state: IPlayerState,
    action: PayloadAction<boolean>
  ) => {
    state.isFullscreen = action.payload;
  },
  [playMedia.type]: (state: IPlayerState) => {
    state.isPlaying = true;
  },
  [pauseMedia.type]: (state: IPlayerState) => {
    state.isPlaying = false;
  },
  [changePlaybackRate.type]: (
    state: IPlayerState,
    action: PayloadAction<number>
  ) => {
    state.playbackRate = action.payload;
  },
  [toggleMute.type]: (state: IPlayerState, action: PayloadAction<boolean>) => {
    state.isMuted = action.payload;
  },
  [changeVolume.type]: (state: IPlayerState, action: PayloadAction<number>) => {
    state.volume = action.payload;
  },
  [updateMediaDuration.type]: (
    state: IPlayerState,
    action: PayloadAction<number>
  ) => {
    state.duration = action.payload;
  },
  [setCurrentTime.type]: (
    state: IPlayerState,
    action: PayloadAction<number>
  ) => {
    state.currentTime = action.payload;
  },
  [seek.type]: (state: IPlayerState, action: PayloadAction<number>) => {
    state.seekingTime = action.payload;
    state.isSeeking = true;
  },
  [stopSeeking.type]: (state: IPlayerState) => {
    state.isSeeking = false;
  },
  [loadConfiguration.type]: (state: IPlayerState, action) => {
    return Object.assign(
      cloneDeep(initialPlayerState),
      cloneDeep(action.payload.player)
    );
  },
  [changeMediaSource.type]: (
    state: IPlayerState,
    action: PayloadAction<string>
  ) => {
    state.sources = state.sources.map((source: ISource) => ({
      ...source,
      selected: source.src === action.payload
    }));
  }
});

export function getLocalPlayerState(mid: string) {
  try {
    const localStorageState = localStorage.getItem(`aiana-media-${mid}`);

    if (localStorageState === null) {
      return undefined;
    }

    return safeLoad(localStorageState);
  } catch (err) {
    return undefined;
  }
}

export function stateToYAML(state: DeepPartial<IPlayerState>) {
  const exportedKeys = [
    'currentTime',
    'isMuted',
    'mediaId',
    'playbackRate',
    'rating',
    'volume'
  ];

  try {
    const exportedState = exportedKeys.reduce((acc, cur) => {
      return Object.assign(acc, { [cur]: state[cur] });
    }, {});

    return safeDump(exportedState);
  } catch (err) {
    return '';
  }
}

export function isSelectedSource(source: ISource): boolean {
  return source.selected === true;
}

export function getSelectedMediaSource(sources: ISource[]) {
  return sources.find(isSelectedSource);
}

export default playerReducer;
