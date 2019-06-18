import { combineReducers } from 'redux';
import bookmarks, { IBookmark } from './bookmarks';
import chapters, { IChaptersState } from './chapters';
import player, { IPlayerState } from './player';
import preferences, { IPreferencesState } from './preferences';
import presets, { IPreset } from './presets';
import slides, { ISlidesState } from './slides';
import subtitles, { ISubtitlesState } from './subtitles';

export interface IAianaState {
  bookmarks: IBookmark[];
  chapters: IChaptersState;
  player: IPlayerState;
  preferences: IPreferencesState;
  presets: IPreset[];
  slides: ISlidesState;
  subtitles: ISubtitlesState;
}

export default combineReducers({
  bookmarks,
  chapters,
  player,
  preferences,
  presets,
  slides,
  subtitles
});
