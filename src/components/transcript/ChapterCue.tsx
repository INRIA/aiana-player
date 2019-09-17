import React, { useContext } from 'react';
import classNames from 'classnames';
import { IMergedCues } from './Transcript';
import styled from '../../utils/styled-components';
import MediaContext from '../../contexts/MediaContext';

interface IProps {
  cue: IMergedCues;
  currentTime: number;
  clickHandler(seekingTime: number): void;
}

const StyledSpan = styled.span`
  &:hover {
    cursor: pointer;
  }
`;

function ChapterCue({ cue, clickHandler, currentTime }: IProps) {
  const [media] = useContext(MediaContext);

  return (
    <h3 className="aip-transcript__chapter">
      <StyledSpan
        className={classNames({
          current: cue.startTime <= currentTime && cue.endTime >= currentTime
        })}
        key={`subtitle_${cue.startTime}_${cue.endTime}`}
        onClick={() => {
          media.currentTime = cue.startTime;
          clickHandler(cue.startTime);
        }}
      >
        {`${cue.text} `}
      </StyledSpan>
    </h3>
  );
}

export default ChapterCue;
