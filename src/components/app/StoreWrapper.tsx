import throttle from 'lodash.throttle';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from 'redux-starter-kit';
import rootReducer, { IAianaState } from '../../reducers';
import ConnectedAiana from './ConnectedAiana';
import i18n from '../../i18n';
import {
  preferencesToYAML,
  getLocalPreferencesState
} from '../../reducers/preferences';
import { stateToYAML as playerToYAML } from '../../reducers/player';

const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState()
});

store.subscribe(
  throttle(() => {
    saveStateToLocalStorage(store.getState() as IAianaState);
  }, 1000)
);

function loadState() {
  try {
    const preferences = getLocalPreferencesState();

    // TODO: should be async
    i18n.changeLanguage(preferences.language);

    return {
      preferences
    };
  } catch (err) {
    return undefined;
  }
}

function genStoragePlayerKey(mediaId: string) {
  return `aiana-media-${mediaId}`;
}

function saveStateToLocalStorage(state: IAianaState) {
  try {
    const serializedPreferences = preferencesToYAML(state.preferences);
    localStorage.setItem('aiana-preferences', serializedPreferences);

    if (state.player.mediaId !== '__unset__') {
      const serializedPlayer = playerToYAML(state.player);

      localStorage.setItem(
        genStoragePlayerKey(state.player.mediaId),
        serializedPlayer
      );
    }

    // TODO: sync state on remote server if provided
  } catch (err) {
    console.log(err);
  }
}

function StoreWrapper() {
  return (
    <Provider store={store}>
      <ConnectedAiana />
    </Provider>
  );
}

export default StoreWrapper;
