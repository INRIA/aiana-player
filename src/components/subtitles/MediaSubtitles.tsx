import * as React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers/index';
import { formatSubtitles } from '../../utils/strings';
import { StyledSpan, StyledSubtitles } from './Styles';

interface IStateProps {
  subtitlesText?: string;
}

const MediaSubtitles: React.SFC<IStateProps> = ({ subtitlesText }) => {
  if (!subtitlesText) {
    return null;
  }

  return (
    <StyledSubtitles>
      {formatSubtitles(subtitlesText).map((line, index) => (
        <StyledSpan key={index}>
          <span>{line}</span>
        </StyledSpan>
      ))}
    </StyledSubtitles>
  );
};

const mapStateToProps = (state: IAianaState) => ({
  subtitlesText: state.subtitles.subtitlesText
});

export default connect(mapStateToProps)(MediaSubtitles);
