import axios from 'axios';
import { safeLoad } from 'js-yaml';
import cloneDeep from 'lodash.clonedeep';
import queryString from 'query-string';
import { DEFAULT_CONFIGURATION_PATH, CONFIGURATION_KEY } from '../constants';
import { IWidget, initialPreferencesState } from '../reducers/preferences';
import { CDispatch } from '../store';
import { ThunkResult, IStdAction } from '../types';
import { changeLanguage } from './preferences';
import { IPreset } from '../reducers/presets';
import { BASE_PRESETS } from '../constants/presets';
import md5 from 'md5';
import { getLocalPlayerState } from '../reducers/player';

export const LOAD_CONFIGURATION = 'aiana/LOAD_CONFIGURATION';
export const CHANGE_WIDGETS = 'aiana/CHANGE_WIDGETS';

interface IQueryString {
  config?: string;
  mid?: string;
  src?: string;
}

// TODO: split function
// FIXME: language and defaults handling isn't robust enough.
export function handleFetchInitialData(): ThunkResult<void> {
  return (dispatch: CDispatch) => {
    const parsedQueryString: IQueryString = queryString.parse(
      window.location.search
    );

    // media id is supplied as query parameter.
    //
    // ?mid=abc123
    if (parsedQueryString.mid) {
      const { mid } = parsedQueryString;
      axios.get(`/api/${mid}.json`).then(({ data }) => {
        const localState = getLocalPlayerState(mid);
        const player = Object.assign({}, data.player, localState);
        const merged = {
          ...data,
          player
        };

        dispatch(loadConfiguration(merged));
      });
    }
    // config url is supplied as query parameter.
    //
    // ?config=https://domain.com/config.json
    else if (parsedQueryString.config) {
      axios.get(parsedQueryString.config).then(({ data }) => {
        try {
          const localState = getLocalPlayerState(data.player.mediaId);
          const player = Object.assign({}, data.player, localState);
          const merged = {
            ...data,
            player
          };

          dispatch(loadConfiguration(merged));
        } catch (e) {
          dispatch(loadConfiguration(data));
        }
      });
    }
    // media source url or path is supplied as query parameter.
    //
    // ?src=https://domain.com/video.mp4
    else if (parsedQueryString.src) {
      const mid = md5(parsedQueryString.src);
      const player = {
        mediaId: mid,
        sources: [{ src: parsedQueryString.src }]
      };

      try {
        const localState = getLocalPlayerState(mid);
        const merged = Object.assign({}, player, localState);

        dispatch(
          loadConfiguration({
            player: merged,
            presets: cloneDeep(BASE_PRESETS)
          })
        );
      } catch (e) {
        dispatch(
          loadConfiguration({
            player,
            presets: cloneDeep(BASE_PRESETS)
          })
        );
      }
    }
    // configuration is supplied as `window.aiana` property.
    else if (getConfig(window)) {
      const config = getConfig(window);

      const presets = Object.assign(
        cloneDeep(BASE_PRESETS),
        cloneDeep(config.presets) || {}
      );

      const mergedPreferences = Object.assign(
        cloneDeep(config.preferences),
        getLocalConfiguration()
      );

      dispatch(changeLanguage(mergedPreferences.language));
      dispatch(
        loadConfiguration({
          ...config,
          preferences: mergedPreferences,
          presets
        })
      );
    }
    // configuration is supplied as a file hosted on the server,
    // at the same level.
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

function getConfig(obj: any) {
  if (CONFIGURATION_KEY in obj) {
    return obj.aiana;
  }
}

function getLocalConfiguration() {
  const serializedPreferences = localStorage.getItem('aiana-preferences');

  if (serializedPreferences === null) {
    return {};
  }

  return Object.assign(
    cloneDeep(initialPreferencesState),
    safeLoad(serializedPreferences)
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
