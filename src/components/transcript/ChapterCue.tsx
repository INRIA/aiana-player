import React from 'react';
import classNames from 'classnames';
import { IMergedCues } from './Transcript';
import styled from '../../utils/styled-components';

interface IProps {
  cue: IMergedCues;
  currentTime: number;
  mediaSelector: string;
  clickHandler(mediaSelector: string, seekingTime: number): void;
}

const StyledSpan = styled.span`
  &:hover {
    cursor: pointer;
  }
`;

function ChapterCue({ cue, mediaSelector, clickHandler, currentTime }: IProps) {
  return (
    <h3 className="aip-transcript__chapter">
      <StyledSpan
        className={classNames({
          current: cue.startTime <= currentTime && cue.endTime >= currentTime
        })}
        key={`subtitle_${cue.startTime}_${cue.endTime}`}
        onClick={() => clickHandler(mediaSelector, cue.startTime)}
      >
        {`${cue.text} `}
      </StyledSpan>
    </h3>
  );
}

export default ChapterCue;
