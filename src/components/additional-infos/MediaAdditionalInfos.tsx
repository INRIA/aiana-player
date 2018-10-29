import * as React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from 'src/reducers';
import { markdownToJSX } from 'src/utils/strings';
import StyledAdditionalInfos from './Styles';

interface IMediaAdditionalInfos {
  text: string | null;
}

// TODO: find a better secure way in replacement of dangerouslySetInnerHTML.
const MediaAdditionalInfos: React.SFC<IMediaAdditionalInfos> = ({ text }) => {
  if (!text) {
    return null;
  }

  return (
    <StyledAdditionalInfos className="aip-additional-infos">
      {markdownToJSX(text)}
    </StyledAdditionalInfos>
  );
};

const mapStateToProps = (state: IAianaState) => ({
  text: state.player.additionalInfosText
});

export default connect(mapStateToProps)(MediaAdditionalInfos);
