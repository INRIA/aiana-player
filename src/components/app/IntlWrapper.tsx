import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers/index';
import { i18nInstance } from '../../translations';

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
  language: state.preferences.language
});

export default connect(mapStateToProps)(IntlWrapper);
