import { CDispatch } from '../store';
import { ThunkResult, ICueBoundaries } from '../types';
import { IRawTrack } from '../utils/media';
import { requestSeek } from './player';
import { createAction } from 'redux-starter-kit';

export const previousChapter = createAction<ICueBoundaries>('PREVIOUS_CHAPTER');

export const nextChapter = createAction<ICueBoundaries>('NEXT_CHAPTER');

export const addChaptersTrack = createAction<IRawTrack>('ADD_CHAPTER_TRACK');

export const updateActiveChaptersTrack = createAction<string>(
  'UPDATE_ACTIVE_CHAPTERS_TRACK'
);

export const setChapterText = createAction<string>('UPDATE_CHAPTER_TEXT');

export function seekNextChapter(
  mediaSelector: string,
  from: number,
  to: number
): ThunkResult<void> {
  return (dispatch: CDispatch) => {
    dispatch(requestSeek(mediaSelector, to));
    dispatch(nextChapter({ from, to }));
  };
}

export function seekPreviousChapter(
  mediaSelector: string,
  from: number,
  to: number
): ThunkResult<void> {
  return (dispatch: CDispatch) => {
    dispatch(requestSeek(mediaSelector, to));
    dispatch(previousChapter({ from, to }));
  };
}
