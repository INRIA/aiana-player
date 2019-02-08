import React from 'react';
import { I18nContextValues, withI18n } from 'react-i18next';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers';
import { markdownToJSX } from '../../utils/strings';
import AssistiveText from '../a11y/AssistiveText';
import withUniqueId, { InjectedUniqueIdProps } from '../hocs/withUniqueId';
import withWindow, { IWindow } from '../hocs/withWindow';
import StyledAdditionalInfos from './Styles';

interface IProps extends InjectedUniqueIdProps, I18nContextValues, IWindow {
  text?: string;
}

function MediaAdditionalInfos({ t, text, uid }: IProps) {
  if (!text) {
    return null;
  }

  return (
    <StyledAdditionalInfos
      className="aip-additional-infos"
      aria-labelledby={uid}
    >
      <div id={uid}>
        <AssistiveText>{t('additional-infos.title')}</AssistiveText>
      </div>
      {markdownToJSX(text)}
    </StyledAdditionalInfos>
  );
}

function mapStateToProps(state: IAianaState) {
  return {
    text: state.player.additionalInformationsText
  };
}

export default connect(mapStateToProps)(
  withI18n()(withWindow(withUniqueId(MediaAdditionalInfos)))
);
