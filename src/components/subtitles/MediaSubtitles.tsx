import * as React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from 'src/reducers/index';
import { formatSubtitles } from 'src/utils/strings';
import { StyledSpan, StyledSubtitles } from './Styles';

interface IVideoSubtitles {
  subtitleText?: string;
}

const MediaSubtitles: React.SFC<IVideoSubtitles> = ({ subtitleText }) => {
  if (!subtitleText) {
    return null;
  }

  return (
    <StyledSubtitles>
      {formatSubtitles(subtitleText).map((line, index) => (
        <StyledSpan key={index}>
          <span>{line}</span>
        </StyledSpan>
      ))}
    </StyledSubtitles>
  );
};

const mapStateToProps = (state: IAianaState) => ({
  subtitleText: state.player.subtitleText
});

export default connect(mapStateToProps)(MediaSubtitles);
