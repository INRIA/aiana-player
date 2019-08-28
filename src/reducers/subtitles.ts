import { loadConfiguration } from '../actions/shared/configuration';
import {
  setSubtitlesText,
  addSubtitlesTrack,
  updateSubtitlesTracksList,
  updateActiveSubtitles
} from '../actions/subtitles';
import {
  IRawTrackExt,
  isActiveTrack,
  isDisplayableTrack,
  IMediaCue
} from '../utils/media';
import { ITrack } from '../components/media/MediaSubtitlesTrack';
import { createReducer } from 'redux-starter-kit';

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
  subtitlesTracks: IRawTrackExt[];

  sources: ISubtitlesTrack[];
}

const initialState = {
  sources: [],
  subtitlesTracks: []
};

const subtitlesReducer = createReducer(initialState, {
  [addSubtitlesTrack.toString()]: (state: ISubtitlesState, action) => {
    state.subtitlesTracks.push(action.payload);
  },
  [updateSubtitlesTracksList.toString()]: (state: ISubtitlesState, action) => {
    state.subtitlesTracks = action.payload;
  },
  [updateActiveSubtitles.toString()]: (state: ISubtitlesState, action) => {
    state.subtitlesTracks = toggleSubtitlesTracks(
      state.subtitlesTracks,
      action.payload
    );
  },
  [setSubtitlesText.toString()]: (state: ISubtitlesState, action) => {
    state.subtitlesText = action.payload;
  },
  [loadConfiguration.toString()]: (state: ISubtitlesState, action) => {
    return {
      ...state,
      ...action.payload.subtitles
    };
  }
});

function toggleTrackActive(language: string) {
  return function(track: IRawTrackExt): IRawTrackExt {
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
  tracks: IRawTrackExt[],
  language: string
): IRawTrackExt[] {
  return tracks.map(toggleTrackActive(language));
}

export function getSelectedSubtitlesTrack(subtitlesTracks: IRawTrackExt[]) {
  return subtitlesTracks.find(isActiveTrack);
}

export function getSelectedSubtitlesTrackCues(
  state: ISubtitlesState
): IMediaCue[] | undefined {
  const track = getSelectedSubtitlesTrack(state.subtitlesTracks);

  return !track
    ? undefined
    : [...track.cues].map((cue: IMediaCue) => ({
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
): IRawTrackExt[] {
  return state.subtitlesTracks.filter(isDisplayableTrack);
}

export function getDisplayableSubtitlesSources(tracks: ITrack[]) {
  return tracks.filter(isDisplayableTrack);
}

export default subtitlesReducer;
