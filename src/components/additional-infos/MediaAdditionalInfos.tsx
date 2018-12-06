import * as React from 'react';
import { I18nContextValues, withI18n } from 'react-i18next';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers';
import { markdownToJSX } from '../../utils/strings';
import { uuid } from '../../utils/ui';
import AssistiveText from '../a11y/AssistiveText';
import StyledAdditionalInfos from './Styles';

interface IProps extends I18nContextValues {
  text?: string;
}

const MediaAdditionalInfos: React.SFC<IProps> = ({ t, text }) => {
  if (!text) {
    return null;
  }

  const uid = uuid();

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
};

const mapStateToProps = (state: IAianaState) => ({
  text: state.player.additionalInformationsText
});

export default connect(mapStateToProps)(withI18n()(MediaAdditionalInfos));
