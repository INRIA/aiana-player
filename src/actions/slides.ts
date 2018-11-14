import { AnyAction } from 'redux';
import { IRawSlidesTrack } from 'src/utils/media';

export const SET_SLIDES_TEXT = 'aiana/SET_SLIDES_TEXT';
export const ADD_SLIDES_TRACK = 'aiana/ADD_SLIDES_TRACK';

export function setSlidesText(text?: string) {
  return {
    text,
    type: SET_SLIDES_TEXT
  };
}

export function addSlidesTrack(track: IRawSlidesTrack): AnyAction {
  return {
    track,
    type: ADD_SLIDES_TRACK
  };
}
