import { combineReducers } from 'redux';
import additionalInformation, {
  IAdditionalInformationState
} from './additional-information';
import bookmarks, { IBookmark } from './bookmarks';
import chapters, { IChaptersState } from './chapters';
import player, { IPlayerState } from './player';
import preferences, { IPreferencesState } from './preferences';
import presets, { IPreset } from './presets';
import slides, { ISlidesState } from './slides';
import subtitles, { ISubtitlesState } from './subtitles';

export interface IAianaState {
  additionalInformation: IAdditionalInformationState;
  bookmarks: IBookmark[];
  chapters: IChaptersState;
  player: IPlayerState;
  preferences: IPreferencesState;
  presets: IPreset[];
  slides: ISlidesState;
  subtitles: ISubtitlesState;
}

export default combineReducers({
  additionalInformation,
  bookmarks,
  chapters,
  player,
  preferences,
  presets,
  slides,
  subtitles
});
