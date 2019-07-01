import { Reducer } from 'redux';
import { LOAD_CONFIGURATION } from '../actions/shared';
import {
  ADD_SUBTITLES_TRACK,
  SET_SUBTITLE_TEXT,
  UPDATE_ACTIVE_SUBTITLES_TRACK,
  UPDATE_SUBTITLES_TRACKS_LIST
} from '../actions/subtitles';
import {
  IRawSubtitlesTrack,
  isActiveTrack,
  isDisplayableTrack,
  IMediaCue
} from '../utils/media';
import { IStdAction } from '../types';
import { ITrack } from '../components/media/MediaSubtitlesTrack';

export interface ISubtitlesTrack {
  label?: string;
  src: string;
  srcLang: string;
}

export interface ISubtitlesState {
  language?: string;
  subtitlesText?: string;

  /**
   * HTMLMediaElement already parses vtt files and manage its own tracks state
   * living inside a TextTrackList. However, the list elements have some
   * properties that are unnecessary to us. The elements will also lose some of
   * the HTML attributes such as `default`.
   * `textTracks` is a collection of lightweight objects with properties from
   * `sources` and `sourceTracks`.
   */
  subtitlesTracks: IRawSubtitlesTrack[];

  sources: ISubtitlesTrack[];
}

const initialState = {
  sources: [],
  subtitlesTracks: []
};

const subtitles: Reducer<ISubtitlesState, IStdAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ADD_SUBTITLES_TRACK: {
      const subtitlesTracks = ([] as IRawSubtitlesTrack[]).concat(
        state.subtitlesTracks,
        action.payload.subtitlesTrack
      );

      return {
        ...state,
        subtitlesTracks
      };
    }
    case UPDATE_SUBTITLES_TRACKS_LIST:
      return {
        ...state,
        subtitlesTracks: action.payload.subtitlesTracks
      };
    case UPDATE_ACTIVE_SUBTITLES_TRACK: {
      return {
        ...state,
        subtitlesTracks: toggleSubtitlesTracks(
          state.subtitlesTracks,
          action.payload.subtitlesTrackLanguage
        )
      };
    }
    case SET_SUBTITLE_TEXT:
      return {
        ...state,
        subtitlesText: action.payload.subtitlesText
      };
    case LOAD_CONFIGURATION:
      return {
        ...state,
        ...action.payload.subtitles
      };
    default:
      return state;
  }
};

export default subtitles;

function toggleTrackActive(language: string) {
  return function(track: IRawSubtitlesTrack): IRawSubtitlesTrack {
    if (track.language === language) {
      return {
        ...track,
        active: true
      };
    }

    if (track.active === true) {
      return {
        ...track,
        active: false
      };
    }

    return {
      ...track
    };
  };
}

function toggleSubtitlesTracks(
  tracks: IRawSubtitlesTrack[],
  language: string
): IRawSubtitlesTrack[] {
  return tracks.map(toggleTrackActive(language));
}

export function getSelectedSubtitlesTrack(
  subtitlesTracks: IRawSubtitlesTrack[]
) {
  return subtitlesTracks.find(isActiveTrack);
}

export function getSelectedSubtitlesTrackCues(
  state: ISubtitlesState
): IMediaCue[] | undefined {
  const track = getSelectedSubtitlesTrack(state.subtitlesTracks);

  return !track
    ? undefined
    : [...track.cues].map((cue: TextTrackCue) => ({
        endTime: cue.endTime,
        startTime: cue.startTime,
        text: cue.text
      }));
}

export function getSelectedSubtitlesLanguage(state: ISubtitlesState): string {
  const selectedTrack = getSelectedSubtitlesTrack(state.subtitlesTracks);
  return selectedTrack ? selectedTrack.language : '';
}

export function getDisplayableSubtitlesTracks(
  state: ISubtitlesState
): IRawSubtitlesTrack[] {
  return state.subtitlesTracks.filter(isDisplayableTrack);
}

export function getDisplayableSubtitlesSources(tracks: ITrack[]) {
  return tracks.filter(isDisplayableTrack);
}
