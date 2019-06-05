import axios from 'axios';
import yaml from 'js-yaml';
import queryString from 'query-string';
import { AnyAction } from 'redux';
import { DEFAULT_CONFIGURATION_PATH } from '../constants';
import { IWidget } from '../reducers/preferences';
import { CDispatch } from '../store';
import { ThunkResult } from '../types';
import { changeLanguage } from './preferences';

export const LOAD_CONFIGURATION = 'aiana/LOAD_CONFIGURATION';
export const CHANGE_WIDGETS = 'aiana/CHANGE_WIDGETS';

export function handleFetchInitialData(): ThunkResult<void> {
  return (dispatch: CDispatch) => {
    const parsed = queryString.parse(window.location.search);

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
        dispatch(changeLanguage(data.preferences.language));
        dispatch(loadConfiguration(data));
      });
    }
  };
}

function loadConfiguration(configuration: any): AnyAction {
  console.log(yaml.safeDump(configuration.preferences));
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

export function updateWidget(
  widgetName: string,
  widget: Partial<IWidget>
): AnyAction {
  return {
    type: CHANGE_WIDGETS,
    widget,
    widgetName
  };
}
