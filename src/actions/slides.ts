import { CDispatch } from '../store';
import { ThunkResult, ICueBoundaries } from '../types';
import { IRawTrack } from '../utils/media';
import { seek } from './player';
import { createAction } from 'redux-starter-kit';

export const PREVIOUS_SLIDE = 'aiana/PREVIOUS_SLIDE';
export const NEXT_SLIDE = 'aiana/NEXT_SLIDE';

export function seekNextSlide(from: number, to: number): ThunkResult<void> {
  return (dispatch: CDispatch) => {
    dispatch(seek(to));
    dispatch(nextSlide({ from, to }));
  };
}

export function seekPreviousSlide(from: number, to: number): ThunkResult<void> {
  return (dispatch: CDispatch) => {
    dispatch(seek(to));
    dispatch(previousSlide({ from, to }));
  };
}

export const previousSlide = createAction<ICueBoundaries>('PREVIOUS_SLIDE');
export const nextSlide = createAction<ICueBoundaries>('NEXT_SLIDE');

export const setSlidesText = createAction<string | undefined>(
  'SET_SLIDES_TEXT'
);

export const addSlidesTrack = createAction<IRawTrack>('ADD_SLIDES_TRACK');

export const updateActiveSlidesTrack = createAction<string>(
  'UPDATE_ACTIVE_SLIDES_TRACK'
);
