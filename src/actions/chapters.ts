import { CDispatch } from '../store';
import { ThunkResult, IStdAction } from '../types';
import { IRawChaptersTrack } from '../utils/media';
import { requestSeek } from './player';

export const ADD_CHAPTER_TRACK = 'aiana/ADD_CHAPTER_TRACK';
export const UPDATE_ACTIVE_CHAPTERS_TRACK =
  'aiana/UPDATE_ACTIVE_CHAPTERS_TRACK';
export const UPDATE_CHAPTER_TEXT = 'aiana/UPDATE_CHAPTER_TEXT';
export const TOGGLE_CHAPTERS_MENU = 'aiana/TOGGLE_CHAPTERS_MENU';

export const PREVIOUS_CHAPTER = 'aiana/PREVIOUS_CHAPTER';
export const NEXT_CHAPTER = 'aiana/NEXT_CHAPTER';

export function seekNextChapter(
  mediaSelector: string,
  from: number,
  to: number
): ThunkResult<void> {
  return (dispatch: CDispatch) => {
    dispatch(requestSeek(mediaSelector, to));
    dispatch(nextChapter(from, to));
  };
}

export function seekPreviousChapter(
  mediaSelector: string,
  from: number,
  to: number
): ThunkResult<void> {
  return (dispatch: CDispatch) => {
    dispatch(requestSeek(mediaSelector, to));
    dispatch(previousChapter(from, to));
  };
}

function previousChapter(from: number, to: number): IStdAction {
  return {
    payload: {
      from,
      to
    },
    type: PREVIOUS_CHAPTER
  };
}

function nextChapter(from: number, to: number): IStdAction {
  return {
    payload: {
      from,
      to
    },
    type: NEXT_CHAPTER
  };
}

export function addChaptersTrack(chaptersTrack: IRawChaptersTrack): IStdAction {
  return {
    payload: {
      chaptersTrack
    },
    type: ADD_CHAPTER_TRACK
  };
}

export function updateActiveChaptersTrack(language: string): IStdAction {
  return {
    payload: {
      language
    },
    type: UPDATE_ACTIVE_CHAPTERS_TRACK
  };
}

export function setChapterText(text?: string): IStdAction {
  return {
    payload: {
      text
    },
    type: UPDATE_CHAPTER_TEXT
  };
}

export function setChaptersMenu(enabled: boolean): IStdAction {
  return {
    payload: {
      enabled
    },
    type: TOGGLE_CHAPTERS_MENU
  };
}
