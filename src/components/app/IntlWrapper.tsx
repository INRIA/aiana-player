import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { connect } from 'react-redux';
import { IConnectedReduxProps } from '../../store';
import { i18nInstance } from '../../translations';

interface IProps {
  language: string;
  children: any;
}

class IntlWrapper extends React.Component<IProps & IConnectedReduxProps> {
  public render() {
    const { children, language } = this.props;

    return (
      <I18nextProvider i18n={i18nInstance} initialLanguage={language}>
        {children}
      </I18nextProvider>
    );
  }
}

export default connect((state: any) => ({
  language: state.preferences.language
}))(IntlWrapper);
