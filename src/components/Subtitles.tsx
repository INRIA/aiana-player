import React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from '../reducers';
import { formatSubtitles } from '../utils/strings';
import { hexToHsla } from '../utils/colors';
import styled from '../utils/styled-components';

interface IStateProps {
  subtitlesText?: string;
}

const StyledSubtitles = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  bottom: 0.5em;
  left: 0;
  text-align: center;

  pointer-events: none;
`;

const StyledSpan = styled.span`
  display: block;

  padding: 0 0.3em;

  border-radius: 0.2em;
  color: ${(props) => props.theme.fg};
  background: ${(props) => hexToHsla(props.theme.bg, 0.9)};

  font-size: 1.25em;

  white-space: nowrap;
  pointer-events: all;
`;

function MediaSubtitles({ subtitlesText }: IStateProps) {
  if (!subtitlesText) {
    return null;
  }

  return (
    <StyledSubtitles>
      {formatSubtitles(subtitlesText).map((textLine, index) => (
        <StyledSpan key={index}>{textLine}</StyledSpan>
      ))}
    </StyledSubtitles>
  );
}

function mapState(state: IAianaState) {
  return {
    subtitlesText: state.subtitles.subtitlesText
  };
}

export default connect(mapState)(MediaSubtitles);
