import * as React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers/index';
import { formatSubtitles } from '../../utils/strings';
import { StyledSpan, StyledSubtitles } from './Styles';

interface IStateProps {
  subtitlesText?: string;
}

function MediaSubtitles({ subtitlesText }: IStateProps) {
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
}

function mapStateToProps(state: IAianaState) {
  return {
    subtitlesText: state.subtitles.subtitlesText
  };
}

export default connect(mapStateToProps)(MediaSubtitles);
