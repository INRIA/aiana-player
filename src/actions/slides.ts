import { CDispatch } from '../store';
import { ThunkResult, IStdAction } from '../types';
import { IRawSlidesTrack } from '../utils/media';
import { requestSeek } from './player';

export const SET_SLIDES_TEXT = 'aiana/SET_SLIDES_TEXT';
export const ADD_SLIDES_TRACK = 'aiana/ADD_SLIDES_TRACK';
export const UPDATE_ACTIVE_SLIDES_TRACK = 'aiana/UPDATE_ACTIVE_SLIDES_TRACK';

export const PREVIOUS_SLIDE = 'aiana/PREVIOUS_SLIDE';
export const NEXT_SLIDE = 'aiana/NEXT_SLIDE';

export function seekNextSlide(
  mediaSelector: string,
  from: number,
  to: number
): ThunkResult<void> {
  return (dispatch: CDispatch) => {
    dispatch(requestSeek(mediaSelector, to));
    dispatch(nextSlide(from, to));
  };
}

export function seekPreviousSlide(
  mediaSelector: string,
  from: number,
  to: number
): ThunkResult<void> {
  return (dispatch: CDispatch) => {
    dispatch(requestSeek(mediaSelector, to));
    dispatch(previousSlide(from, to));
  };
}

function previousSlide(from: number, to: number): IStdAction {
  return {
    payload: {
      from,
      to
    },
    type: PREVIOUS_SLIDE
  };
}

function nextSlide(from: number, to: number): IStdAction {
  return {
    payload: {
      from,
      to
    },
    type: NEXT_SLIDE
  };
}

export function setSlidesText(text?: string) {
  return {
    payload: {
      text
    },
    type: SET_SLIDES_TEXT
  };
}

export function addSlidesTrack(track: IRawSlidesTrack): IStdAction {
  return {
    payload: {
      track
    },
    type: ADD_SLIDES_TRACK
  };
}

export function updateActiveSlidesTrack(language: string): IStdAction {
  return {
    payload: {
      language
    },
    type: UPDATE_ACTIVE_SLIDES_TRACK
  };
}
