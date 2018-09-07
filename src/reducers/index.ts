import { combineReducers } from 'redux';
import player, { IPlayerState } from './player';
import preferences, { IPreferencesState } from './preferences';

export interface IAianaState {
  player: IPlayerState;
  preferences: IPreferencesState;
}

export default combineReducers({
  player,
  preferences
});
