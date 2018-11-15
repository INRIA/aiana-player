import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { IAianaState } from 'src/reducers';
import { markdownToJSX } from 'src/utils/strings';
import { uuid } from 'src/utils/ui';
import AssistiveText from '../a11y/AssistiveText';
import StyledAdditionalInfos from './Styles';

interface IMediaAdditionalInfos extends InjectedTranslateProps {
  text?: string;
}

const MediaAdditionalInfos: React.SFC<IMediaAdditionalInfos> = ({
  t,
  text
}) => {
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

export default connect(mapStateToProps)(translate()(MediaAdditionalInfos));
