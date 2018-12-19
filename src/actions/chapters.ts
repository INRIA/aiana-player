import { AnyAction } from 'redux';
import { IRawChaptersTrack } from '../utils/media';

export const ADD_CHAPTER_TRACK = 'aiana/ADD_CHAPTER_TRACK';
export const UPDATE_ACTIVE_CHAPTERS_TRACK =
  'aiana/UPDATE_ACTIVE_CHAPTERS_TRACK';
export const UPDATE_CHAPTER_TEXT = 'aiana/UPDATE_CHAPTER_TEXT';
export const TOGGLE_CHAPTERS_MENU = 'aiana/TOGGLE_CHAPTERS_MENU';

export function addChaptersTrack(chaptersTrack: IRawChaptersTrack): AnyAction {
  return {
    chaptersTrack,
    type: ADD_CHAPTER_TRACK
  };
}

export function updateActiveChaptersTrack(language: string): AnyAction {
  return {
    language,
    type: UPDATE_ACTIVE_CHAPTERS_TRACK
  };
}

export function setChapterText(text?: string): AnyAction {
  return {
    text,
    type: UPDATE_CHAPTER_TEXT
  };
}

export function setChaptersMenu(enabled: boolean): AnyAction {
  return {
    enabled,
    type: TOGGLE_CHAPTERS_MENU
  };
}
