import { ICueBoundaries } from '../types';
import { IRawTrack } from '../utils/media';
import { createAction } from 'redux-starter-kit';

export const previousChapter = createAction<ICueBoundaries>('PREVIOUS_CHAPTER');

export const nextChapter = createAction<ICueBoundaries>('NEXT_CHAPTER');

export const addChaptersTrack = createAction<IRawTrack>('ADD_CHAPTER_TRACK');

export const updateActiveChaptersTrack = createAction<string>(
  'UPDATE_ACTIVE_CHAPTERS_TRACK'
);

export const setChapterText = createAction<string>('UPDATE_CHAPTER_TEXT');
