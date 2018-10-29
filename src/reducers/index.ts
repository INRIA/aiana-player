import { combineReducers } from 'redux';
import bookmarks, { IBookmarksState } from './bookmarks';
import player, { IPlayerState } from './player';
import preferences, { IPreferencesState } from './preferences';
import slides, { ISlidesState } from './slides';

export interface IAianaState {
  bookmarks: IBookmarksState;
  player: IPlayerState;
  preferences: IPreferencesState;
  slides: ISlidesState;
}

export default combineReducers({
  bookmarks,
  player,
  preferences,
  slides
});
