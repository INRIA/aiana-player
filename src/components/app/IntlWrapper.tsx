import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers';
import { i18nInstance } from '../../translations';

interface IProps {
  language: string;
  children: any;
}

function IntlWrapper({ children, language }: IProps) {
  return (
    <I18nextProvider i18n={i18nInstance} initialLanguage={language}>
      {children}
    </I18nextProvider>
  );
}

function mapStateToProps(state: IAianaState) {
  return {
    language: state.preferences.currentLanguage
  };
}

export default connect(mapStateToProps)(IntlWrapper);
