import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import frLocaleData from 'react-intl/locale-data/fr';
import { configure, setAddon, addDecorator } from '@storybook/react';
import { setIntlConfig, withIntl } from 'storybook-addon-intl';
import JSXAddon from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs/react';
import { setDefaults } from '@storybook/addon-info';

import messagesFr from '../src/translations/fr.json';

addLocaleData([...enLocaleData, ...frLocaleData]);

const messages = {
  fr: messagesFr
};

const getMessages = (locale) => messages[locale];

setIntlConfig({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  getMessages
});

addDecorator(withKnobs);
addDecorator(withIntl);
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
