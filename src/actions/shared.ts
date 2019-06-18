import axios from 'axios';
import yaml from 'js-yaml';
import cloneDeep from 'lodash.clonedeep';
import queryString from 'query-string';
import { DEFAULT_CONFIGURATION_PATH } from '../constants';
import { IWidget, initialPreferencesState } from '../reducers/preferences';
import { CDispatch } from '../store';
import { ThunkResult, IStdAction } from '../types';
import { changeLanguage } from './preferences';
import { IPreset } from '../reducers/presets';

export const LOAD_CONFIGURATION = 'aiana/LOAD_CONFIGURATION';
export const CHANGE_WIDGETS = 'aiana/CHANGE_WIDGETS';

interface IQueryString {
  config?: string;
  src?: string;
}

// FIXME: language and defaults handling isn't robust enough.
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
        const activePreset = data.presets.find((p: IPreset) => p.selected);

        const mergedPreferences = Object.assign(
          cloneDeep(activePreset) || {},
          cloneDeep(data.preferences),
          getLocalConfiguration()
        );

        dispatch(changeLanguage(mergedPreferences.language));
        dispatch(
          loadConfiguration({
            ...data,
            preferences: mergedPreferences
          })
        );
      });
      // TODO: handle loading error
    }
  };
}

function getLocalConfiguration() {
  const serializedPreferences = localStorage.getItem('aiana-preferences');

  if (serializedPreferences === null) {
    return {};
  }

  return Object.assign(
    cloneDeep(initialPreferencesState),
    yaml.safeLoad(serializedPreferences)
  );
}

function loadConfiguration(configuration: any): IStdAction {
  return {
    payload: {
      bookmarks: configuration.bookmarks,
      chapters: configuration.chapters,
      player: configuration.player,
      preferences: configuration.preferences,
      presets: configuration.presets,
      slides: configuration.slides,
      subtitles: configuration.subtitles
    },
    type: LOAD_CONFIGURATION
  };
}

export function updateWidget(
  widgetName: string,
  widget: Partial<IWidget>
): IStdAction {
  return {
    payload: {
      widget,
      widgetName
    },
    type: CHANGE_WIDGETS
  };
}
