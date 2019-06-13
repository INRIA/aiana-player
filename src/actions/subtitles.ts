import { ThunkResult, IStdAction } from '../types';
import { IRawSubtitlesTrack } from '../utils/media';

export const UPDATE_SUBTITLES_TRACKS_LIST =
  'aiana/UPDATE_SUBTITLES_TRACKS_LIST';
export const UPDATE_ACTIVE_SUBTITLES_TRACK =
  'aiana/UPDATE_ACTIVE_SUBTITLES_TRACK';
export const SET_SUBTITLE_TEXT = 'aiana/SET_SUBTITLE_TEXT';
export const ADD_SUBTITLES_TRACK = 'aiana/ADD_SUBTITLES_TRACK';

export function setSubtitlesText(text?: string): IStdAction {
  return {
    payload: {
      subtitlesText: text
    },
    type: SET_SUBTITLE_TEXT
  };
}

export function updateActiveSubtitlesTrack(
  subtitlesTrackLanguage: string
): ThunkResult<void> {
  return (dispatch) => {
    dispatch({
      payload: {
        subtitlesTrackLanguage
      },
      type: UPDATE_ACTIVE_SUBTITLES_TRACK
    });

    if (subtitlesTrackLanguage === '') {
      dispatch(setSubtitlesText());
    }
  };
}

export function addSubtitlesTrack(
  subtitlesTrack: IRawSubtitlesTrack
): IStdAction {
  return {
    payload: {
      subtitlesTrack
    },
    type: ADD_SUBTITLES_TRACK
  };
}

export function updateSubtitlesTracksList(
  subtitlesTracks: IRawSubtitlesTrack[]
): IStdAction {
  return {
    payload: {
      subtitlesTracks
    },
    type: UPDATE_SUBTITLES_TRACKS_LIST
  };
}
