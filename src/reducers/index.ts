import { combineReducers } from 'redux';
import bookmarks, { IBookmarks } from './bookmarks';
import player, { IPlayerState } from './player';
import preferences, { IPreferencesState } from './preferences';

export interface IAianaState {
  bookmarks: IBookmarks;
  player: IPlayerState;
  preferences: IPreferencesState;
}

export default combineReducers({
  bookmarks,
  player,
  preferences
});
