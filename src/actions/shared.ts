import axios from 'axios';
import queryString from 'query-string';
import { AnyAction } from 'redux';
import { DEFAULT_CONFIGURATION_PATH } from '../constants';
import { IWidget } from '../reducers/preferences';
import { CDispatch } from '../store';
import { ThunkResult } from '../types';
import { changeLanguage } from './preferences';

export const LOAD_CONFIGURATION = 'aiana/LOAD_CONFIGURATION';
export const CHANGE_WIDGETS = 'aiana/CHANGE_WIDGETS';

interface IQueryString {
  config?: string;
  src?: string;
}

export function handleFetchInitialData(): ThunkResult<void> {
  return (dispatch: CDispatch) => {
    const parsedQueryString = queryString.parse(
      window.location.search
    ) as IQueryString;

    // supply config url
    if (parsedQueryString.config) {
      axios.get(parsedQueryString.config).then(({ data }) => {
        dispatch(loadConfiguration(data));
      });
    }
    // supply media src
    else if (parsedQueryString.src) {
      dispatch(
        loadConfiguration({
          player: {
            sources: [{ src: parsedQueryString.src }]
          }
        })
      );
    }
    // use hosted configuration
    else {
      axios.get(DEFAULT_CONFIGURATION_PATH).then(({ data }) => {
        dispatch(changeLanguage(data.preferences.language));
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
