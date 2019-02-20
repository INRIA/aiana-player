import axios from 'axios';
import queryString from 'query-string';
import { AnyAction } from 'redux';
import { DEFAULT_CONFIGURATION_PATH } from '../constants';
import { IUIWindow } from '../reducers/preferences';
import { CDispatch } from '../store';
import { ThunkResult } from '../types';
import { changeCurrentLanguage } from './preferences';

export const LOAD_CONFIGURATION = 'aiana/LOAD_CONFIGURATION';
export const TOGGLE_ACTIVITY = 'aiana/TOGGLE_ACTIVITY';
export const CHANGE_UI_WINDOWS = 'aiana/CHANGE_UI_WINDOWS';

export function handleFetchInitialData(): ThunkResult<void> {
  return (dispatch: CDispatch) => {
    const parsed = queryString.parse(location.search);

    if (parsed.config) {
      axios.get(parsed.config as string).then(({ data }) => {
        dispatch(loadConfiguration(data));
      });
    } else if (parsed.src) {
      dispatch(
        loadConfiguration({
          player: {
            sources: [{ src: parsed.src }]
          }
        })
      );
    } else {
      axios.get(DEFAULT_CONFIGURATION_PATH).then(({ data }) => {
        dispatch(changeCurrentLanguage(data.preferences.language));
        dispatch(loadConfiguration(data));
      });
    }
  };
}

function loadConfiguration(configuration: any): AnyAction {
  return {
    bookmarks: configuration.bookmarks,
    chapters: configuration.chapters,
    player: configuration.player,
    preferences: configuration.preferences,
    slides: configuration.slides,
    subtitles: configuration.subtitles,
    type: LOAD_CONFIGURATION
  };
}

export function updateUIWindow(windowId: string, window: IUIWindow): AnyAction {
  return {
    type: CHANGE_UI_WINDOWS,
    window,
    windowId
  };
}

export function toggleActivity(isActive: boolean): AnyAction {
  return {
    isActive,
    type: TOGGLE_ACTIVITY
  };
}
