import * as React from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import * as localeEn from 'react-intl/locale-data/en';
import * as localeFr from 'react-intl/locale-data/fr';
import { connect } from 'react-redux';
import { IConnectedReduxProps } from '../../store';
import translations, { ITranslationsCollection } from '../../translations';

interface IProps {
  language: string;
  children: any;
}

const messages: ITranslationsCollection = translations;

addLocaleData([...localeEn, ...localeFr]);

class IntlWrapper extends React.Component<IProps & IConnectedReduxProps> {
  public render() {
    const { children, language } = this.props;

    return (
      <IntlProvider
        locale={language}
        key={language}
        messages={messages[language]}
      >
        {children}
      </IntlProvider>
    );
  }
}

export default connect((state: any) => ({
  language: state.preferences.language
}))(IntlWrapper);
