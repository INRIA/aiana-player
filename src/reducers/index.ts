import { combineReducers } from 'redux';
import bookmarks, { IBookmarksState } from './bookmarks';
import chapters, { IChaptersState } from './chapters';
import player, { IPlayerState } from './player';
import preferences, { IPreferencesState } from './preferences';
import slides, { ISlidesState } from './slides';

export interface IAianaState {
  bookmarks: IBookmarksState;
  chapters: IChaptersState;
  player: IPlayerState;
  preferences: IPreferencesState;
  slides: ISlidesState;
}

export default combineReducers({
  bookmarks,
  chapters,
  player,
  preferences,
  slides
});
