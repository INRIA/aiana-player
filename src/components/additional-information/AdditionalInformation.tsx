import React from 'react';
import { useTranslation } from 'react-i18next';
import withWindow from '../../hocs/with-window';
import withUniqueId, { InjectedUniqueIdProps } from '../../hocs/withUniqueId';
import { markdownToJSX } from '../../utils/strings';
import AssistiveText from '../a11y/AssistiveText';
import StyledAdditionalInformation from './Styles';

interface IProps extends InjectedUniqueIdProps {
  text?: string;
}

function AdditionalInformation({ text, uid }: IProps) {
  const [t] = useTranslation();

  if (!text) {
    return null;
  }

  return (
    <StyledAdditionalInformation
      className="aip-additional-info"
      aria-labelledby={uid}
    >
      <AssistiveText id={uid}>{t('additional-info.title')}</AssistiveText>
      <div className="aip-additional-info-content">{markdownToJSX(text)}</div>
    </StyledAdditionalInformation>
  );
}

export default withWindow(withUniqueId(AdditionalInformation));
