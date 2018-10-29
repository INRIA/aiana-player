import * as React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from 'src/reducers';
import { markdownToJSX } from 'src/utils/strings';
import { uuid } from 'src/utils/ui';
import AssistiveText from '../a11y/AssistiveText';
import StyledAdditionalInfos from './Styles';

interface IMediaAdditionalInfos {
  text: string | null;
}

// TODO: find a better secure way in replacement of dangerouslySetInnerHTML.
const MediaAdditionalInfos: React.SFC<IMediaAdditionalInfos> = ({ text }) => {
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
        <AssistiveText>Additional Information</AssistiveText>
      </div>
      {markdownToJSX(text)}
    </StyledAdditionalInfos>
  );
};

const mapStateToProps = (state: IAianaState) => ({
  text: state.player.additionalInfosText
});

export default connect(mapStateToProps)(MediaAdditionalInfos);
