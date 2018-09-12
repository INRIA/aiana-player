import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers/index';
import { IConnectedReduxProps } from '../../store';
import { i18nInstance } from '../../translations';

interface IProps {
  language: string;
  children: any;
}

const IntlWrapper: React.SFC<IProps & IConnectedReduxProps> = ({
  children,
  language
}) => (
  <I18nextProvider i18n={i18nInstance} initialLanguage={language}>
    {children}
  </I18nextProvider>
);

export default connect((state: IAianaState) => ({
  language: state.preferences.language
}))(IntlWrapper);
