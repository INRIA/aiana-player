import { Reducer } from 'redux';
import {
  ADD_SUBTITLES_TRACK,
  SET_SUBTITLE_TEXT,
  UPDATE_ACTIVE_SUBTITLES_TRACK,
  UPDATE_SUBTITLES_TRACKS_LIST
} from 'src/actions/subtitles';
import { IRawSubtitlesTrack } from 'src/utils/media';

export interface ISubtitlesTrack {
  label: string;
  src: string;
  srcLang: string;
}

export interface ISubtitlesState {
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

  readonly sources: ISubtitlesTrack[];
}

const initialState = {
  sources: [
    {
      label: 'Default subtitles (English)',
      src: 'http://localhost:3000/dev/subtitles.vtt',
      srcLang: 'en'
    },
    {
      label: 'Sous-titres',
      src: 'http://localhost:3000/dev/subtitles.1.vtt',
      srcLang: 'fr'
    }
  ],
  subtitlesTracks: []
};

const subtitles: Reducer = (state: ISubtitlesState = initialState, action) => {
  switch (action.type) {
    case ADD_SUBTITLES_TRACK: {
      const subtitlesTracks = [].concat(
        state.subtitlesTracks as any,
        action.subtitlesTrack
      );

      return {
        ...state,
        subtitlesTracks
      };
    }
    case UPDATE_SUBTITLES_TRACKS_LIST:
      return {
        ...state,
        subtitlesTracks: action.subtitlesTracks
      };
    case UPDATE_ACTIVE_SUBTITLES_TRACK: {
      const subtitlesTracks = state.subtitlesTracks.map((track) => {
        if (track.label === action.subtitlesTrackLabel) {
          return { ...track, active: true };
        }
        if (track.active === true) {
          return { ...track, active: false };
        }
        return { ...track };
      });

      return {
        ...state,
        subtitlesTracks
      };
    }
    case SET_SUBTITLE_TEXT:
      return {
        ...state,
        subtitlesText: action.subtitlesText
      };
    default:
      return state;
  }
};

export default subtitles;
