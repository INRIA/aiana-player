import { AnyAction } from 'redux';
import { ThunkResult } from '../types';
import { IRawSubtitlesTrack } from '../utils/media';

export const UPDATE_SUBTITLES_TRACKS_LIST =
  'aiana/UPDATE_SUBTITLES_TRACKS_LIST';
export const UPDATE_ACTIVE_SUBTITLES_TRACK =
  'aiana/UPDATE_ACTIVE_SUBTITLES_TRACK';
export const SET_SUBTITLE_TEXT = 'aiana/SET_SUBTITLE_TEXT';
export const ADD_SUBTITLES_TRACK = 'aiana/ADD_SUBTITLES_TRACK';

export function setSubtitlesText(text?: string): AnyAction {
  return {
    subtitlesText: text,
    type: SET_SUBTITLE_TEXT
  };
}

export function updateActiveSubtitlesTrack(
  subtitlesTrackLanguage: string
): ThunkResult<void> {
  return (dispatch) => {
    dispatch({
      subtitlesTrackLanguage,
      type: UPDATE_ACTIVE_SUBTITLES_TRACK
    });

    if (subtitlesTrackLanguage === '') {
      dispatch(setSubtitlesText());
    }
  };
}

export function addSubtitlesTrack(
  subtitlesTrack: IRawSubtitlesTrack
): AnyAction {
  return {
    subtitlesTrack,
    type: ADD_SUBTITLES_TRACK
  };
}

export function updateSubtitlesTracksList(
  subtitlesTracks: IRawSubtitlesTrack[]
): AnyAction {
  return {
    subtitlesTracks,
    type: UPDATE_SUBTITLES_TRACKS_LIST
  };
}
