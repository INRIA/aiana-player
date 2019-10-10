import axios from 'axios';
import { safeLoad } from 'js-yaml';
import cloneDeep from 'lodash.clonedeep';
import queryString from 'query-string';
import { DEFAULT_CONFIGURATION_PATH, CONFIGURATION_KEY } from '../../constants';
import { IWidget } from '../../reducers/preferences';
import { initialPreferencesState } from '../../constants/default-preferences-state';
import { CDispatch } from '../../store';
import { ThunkResult, IQueryString } from '../../types';
import { IPreset } from '../../reducers/presets';
import { BASE_PRESETS } from '../../constants/presets';
import md5 from 'md5';
import { getLocalPlayerState } from '../../reducers/player';
import { createAction } from 'redux-starter-kit';
import i18n from '../../i18n';
import { loadConfiguration } from './configuration';

// TODO: split function
// FIXME: language and defaults handling isn't robust enough.
async function getConfigurationData() {
  const parsedQueryString: IQueryString = queryString.parse(
    window.location.search
  );

  // media id is supplied as query parameter.
  //
  // ?mid=abc123
  if (parsedQueryString.mid) {
    const { mid } = parsedQueryString;

    const { data } = await axios.get(`/api/${mid}.json`);
    const localState = getLocalPlayerState(mid);
    const player = Object.assign({}, data.player, localState);
    const merged = {
      ...data,
      player
    };

    return merged;
  }
  // config url is supplied as query parameter.
  //
  // ?config=https://domain.com/config.json
  else if (parsedQueryString.config) {
    const { data } = await axios.get(parsedQueryString.config);

    try {
      const localState = getLocalPlayerState(data.player.mediaId);
      const player = Object.assign({}, data.player, localState);
      const merged = {
        ...data,
        player
      };

      return merged;
    } catch (e) {
      return data;
    }
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

      return {
        player: merged,
        presets: cloneDeep(BASE_PRESETS)
      };
    } catch (e) {
      return {
        player,
        presets: cloneDeep(BASE_PRESETS)
      };
    }
  }
  // configuration is supplied as `window.aiana` property.
  else if (getConfig(window)) {
    const config = getConfig(window);
    const localState = getLocalPlayerState(config.player.mediaId);
    const player = Object.assign({}, config.player, localState);

    const presets = Object.assign(
      cloneDeep(BASE_PRESETS),
      cloneDeep(config.presets) || {}
    );

    const mergedPreferences = Object.assign(
      cloneDeep(config.preferences) || {},
      getLocalConfiguration()
    );

    await i18n.changeLanguage(mergedPreferences.language);

    return {
      ...config,
      player,
      preferences: mergedPreferences,
      presets
    };
  }
  // configuration is supplied as a file hosted on the server,
  // at the same level.
  else {
    const { data } = await axios.get(DEFAULT_CONFIGURATION_PATH);

    const activePreset = data.presets.find((p: IPreset) => p.selected);

    const mergedPreferences = Object.assign(
      cloneDeep(activePreset) || {},
      cloneDeep(data.preferences),
      getLocalConfiguration()
    );

    await i18n.changeLanguage(mergedPreferences.language);

    return {
      ...data,
      preferences: mergedPreferences
    };
    // TODO: handle loading error
  }
}

export function handleFetchInitialData(): ThunkResult<void> {
  return async (dispatch: CDispatch) => {
    const conf = await getConfigurationData();
    dispatch(loadConfiguration(conf));
  };
}

function getConfig(obj: any) {
  if (CONFIGURATION_KEY in obj) {
    return obj[CONFIGURATION_KEY];
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

export const updateWidget = createAction(
  'CHANGE_WIDGETS',
  (name: string, widget: Partial<IWidget>) => {
    return {
      payload: {
        name,
        widget
      }
    };
  }
);
