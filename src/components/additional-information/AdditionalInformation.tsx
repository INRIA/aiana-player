import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers';
import { markdownToJSX } from '../../utils/strings';
import AssistiveText from '../a11y/AssistiveText';
import withUniqueId, { InjectedUniqueIdProps } from '../hocs/withUniqueId';
import withWindow, { IWindow } from '../hocs/withWindow';
import StyledAdditionalInformation from './Styles';

interface IProps extends InjectedUniqueIdProps, IWindow {
  text?: string;
}

function AdditionalInformation({ text, uid }: IProps) {
  if (!text) {
    return null;
  }

  const [t] = useTranslation();

  return (
    <StyledAdditionalInformation
      className="aip-additional-info"
      aria-labelledby={uid}
    >
      <AssistiveText id={uid}>{t('additional-info.title')}</AssistiveText>
      {markdownToJSX(text)}
    </StyledAdditionalInformation>
  );
}

function mapStateToProps(state: IAianaState) {
  return {
    text: state.player.additionalInformationText
  };
}

export default connect(mapStateToProps)(
  withWindow(withUniqueId(AdditionalInformation))
);
