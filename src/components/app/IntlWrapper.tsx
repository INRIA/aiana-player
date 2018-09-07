import * as React from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import * as localeEn from 'react-intl/locale-data/en';
import * as localeFr from 'react-intl/locale-data/fr';
import { DEFAULT_LANG } from '../../constants';
import * as messagesFr from '../../translations/fr.json';

interface IState {
  language: string;
}

interface IProps {
  language?: string;
  children?: any;
}

const messages: any = {
  fr: messagesFr
};

addLocaleData([...localeEn, ...localeFr]);

class IntlWrapper extends React.Component<IProps, IState> {
  public static defaultProps: IProps = {
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
    const { children } = this.props;

    return (
      <IntlProvider locale={language} messages={messages[language]}>
        {children}
      </IntlProvider>
    );
  }
}

export default IntlWrapper;
