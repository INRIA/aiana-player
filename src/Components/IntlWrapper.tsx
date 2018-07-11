import * as React from 'react';

import Player from './Player';

import { addLocaleData, IntlProvider } from 'react-intl';
import * as locale_en from 'react-intl/locale-data/en';
import * as locale_fr from 'react-intl/locale-data/fr';
import * as messages_fr from '../translations/fr.json';

interface IState {
  language: string;
}

interface IProps {
  readonly language?: string;
}

const defaultLanguage = 'en';

const messages: any = {
  fr: messages_fr
};

addLocaleData([...locale_en, ...locale_fr]);

class IntlWrapper extends React.Component<IProps, IState> {
  public static defaultProps = {
    language: defaultLanguage
  };

  constructor(props: any) {
    super(props);

    const { language } = props;

    this.state = { language };
  }

  public render(): JSX.Element {
    const { language = defaultLanguage } = this.state;

    return (
      <IntlProvider locale={language} messages={messages[language]}>
        <Player />
      </IntlProvider>
    );
  }
}

export default IntlWrapper;
