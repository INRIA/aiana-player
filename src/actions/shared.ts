import axios from 'axios';
import * as queryString from 'query-string';
import { AnyAction } from 'redux';
import { DEFAULT_CONFIGURATION_PATH } from '../constants';
import { CDispatch } from '../store';
import { ThunkResult } from '../types';

export const LOAD_CONFIGURATION = 'aiana/LOAD_CONFIGURATION';
export const TOGGLE_ACTIVITY = 'aiana/TOGGLE_ACTIVITY';

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

export function toggleActivity(isActive: boolean): AnyAction {
  return {
    isActive,
    type: TOGGLE_ACTIVITY
  };
}
