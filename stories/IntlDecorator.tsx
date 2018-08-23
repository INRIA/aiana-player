import * as React from 'react';

import { addLocaleData, IntlProvider } from 'react-intl';
import * as locale_en from 'react-intl/locale-data/en';
import * as locale_fr from 'react-intl/locale-data/fr';
import * as messages_fr from '../src/translations/fr.json';

import { DEFAULT_LANG } from '../src/constants';

const messages: any = {
  fr: messages_fr
};

const language = DEFAULT_LANG;

addLocaleData([...locale_en, ...locale_fr]);

const IntlDecorator = (storyFn: any) => (
  <IntlProvider locale={language} messages={messages[language]}>
    <div
      style={{
        backgroundColor: '#000',
        padding: '20px'
      }}
    >
      {storyFn()}
    </div>
  </IntlProvider>
);

export default IntlDecorator;
