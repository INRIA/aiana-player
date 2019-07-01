import React from 'react';
import classNames from 'classnames';
import styled from '../../utils/styled-components';
import { IMergedCues } from './Transcript';

interface IProps {
  cue: IMergedCues;
  currentTime: number;
  mediaSelector: string;
  clickHandler(mediaSelector: string, seekingTime: number): void;
}

const StyledSpan = styled.span`
  &:hover {
    background-color: ${(props) => props.theme.highlight};
    cursor: pointer;
  }

  &.current {
    background-color: ${(props) => props.theme.highlight};
  }
`;

function SubtitlesCueText({
  cue,
  mediaSelector,
  clickHandler,
  currentTime
}: IProps) {
  if (!cue) {
    return null;
  }

  return (
    <StyledSpan
      className={classNames({
        current: cue.startTime <= currentTime && cue.endTime >= currentTime
      })}
      key={`subtitle_${cue.startTime}_${cue.endTime}`}
      onClick={() => clickHandler(mediaSelector, cue.startTime)}
    >
      {`${cue.text} `}
    </StyledSpan>
  );
}

export default SubtitlesCueText;
