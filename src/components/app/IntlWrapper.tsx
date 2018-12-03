import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { connect } from 'react-redux';
import { IAianaState } from 'src/reducers';
import { i18nInstance } from 'src/translations';

interface IProps {
  language: string;
  children: any;
}

const IntlWrapper: React.SFC<IProps> = ({ children, language }) => (
  <I18nextProvider i18n={i18nInstance} initialLanguage={language}>
    {children}
  </I18nextProvider>
);

const mapStateToProps = (state: IAianaState) => ({
  language: state.preferences.currentLanguage
});

export default connect(mapStateToProps)(IntlWrapper);
