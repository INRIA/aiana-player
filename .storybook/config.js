import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import frLocaleData from 'react-intl/locale-data/fr';
import JSXAddon from 'storybook-addon-jsx';
import { configureActions } from '@storybook/addon-actions';
import addonBackgrounds from '@storybook/addon-backgrounds';
import { setDefaults } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';
import { configure, setAddon, addDecorator } from '@storybook/react';

import messagesFr from '../src/translations/fr.json';

addLocaleData([...enLocaleData, ...frLocaleData]);

const messages = {
  fr: messagesFr
};

const getMessages = (locale) => messages[locale];

const backgrounds = addonBackgrounds([
  { name: 'Inria', value: '#384257', default: true },
  { name: 'black', value: '#000' },
  { name: 'dark gray', value: '#333' },
  { name: 'light gray', value: '#ccc' }
]);

configureActions({
  depth: 100,
  limit: 20
});

addDecorator(withKnobs);
addDecorator(backgrounds);
setAddon(JSXAddon);

setDefaults({
  header: true,
  inline: true,
  source: false
});

addDecorator(withKnobs);
setAddon(JSXAddon);

// automatically import all files ending in *.stories.ts and *.stories.tsx
const req = require.context('../stories', true, /.stories.tsx?$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
