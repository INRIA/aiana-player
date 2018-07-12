import * as React from 'react';
import { DEFAULT_LANG, DEFAULT_MEDIA_TYPE } from '../constants';
import Player from './Player';

import { addLocaleData, IntlProvider } from 'react-intl';
import * as locale_en from 'react-intl/locale-data/en';
import * as locale_fr from 'react-intl/locale-data/fr';
import * as messages_fr from '../translations/fr.json';

const mediaSources = [
  {
    type: 'video/mp4',
    url: 'https://d381hmu4snvm3e.cloudfront.net/videos/w0z9Ik6mMj83/SD.mp4'
  }
];

interface IState {
  language: string;
}

interface IProps {
  readonly language?: string;
}

const messages: any = {
  fr: messages_fr
};

addLocaleData([...locale_en, ...locale_fr]);

class IntlWrapper extends React.Component<IProps, IState> {
  public static state = {
    language: DEFAULT_LANG
  };

  constructor(props: IProps) {
    super(props);

    const { language = DEFAULT_LANG } = this.props;

    this.state = {
      language
    };
  }

  public render() {
    const { language } = this.state;

    return (
      <IntlProvider locale={language} messages={messages[language]}>
        <Player
          mediaSources={mediaSources}
          locale={language}
          mediaType={DEFAULT_MEDIA_TYPE}
        />
      </IntlProvider>
    );
  }
}

export default IntlWrapper;
