import yaml from 'js-yaml';
import throttle from 'lodash.throttle';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import middleware from '../../middleware';
import reducers from '../../reducers';
import ConnectedAiana from './ConnectedAiana';
import i18n from '../../i18n';

const store = createStore(
  reducers,
  loadState(),
  composeWithDevTools(middleware)
);

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

function loadState() {
  try {
    const serializedPreferences = localStorage.getItem('aiana-preferences');

    if (serializedPreferences === null) {
      return undefined;
    }

    const preferences = yaml.safeLoad(serializedPreferences);

    // TODO: should be async
    i18n.changeLanguage(preferences.language);

    return {
      preferences
    };
  } catch (err) {
    return undefined;
  }
}

function saveState(state: any) {
  const exportedKeys = [
    'fontFace',
    'fontSizeMultiplier',
    'fontUppercase',
    'language',
    'lineHeight',
    'previousChapterSeekThreshold',
    'seekStep',
    'seekStepMultiplier',
    'textHighlighting',
    'theme',
    'volumeStep',
    'volumeStepMultiplier',
    'widgets'
  ];

  try {
    const exportedPrefs = exportedKeys.reduce((acc, cur) => {
      acc[cur] = state.preferences[cur];
      return acc;
    }, {});

    const serializedPreferences = yaml.safeDump(exportedPrefs);

    localStorage.setItem('aiana-preferences', serializedPreferences);

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
