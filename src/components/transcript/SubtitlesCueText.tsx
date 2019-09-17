import React, { useContext } from 'react';
import classNames from 'classnames';
import styled from '../../utils/styled-components';
import { IMergedCues } from './Transcript';
import MediaContext from '../../contexts/MediaContext';

interface IProps {
  cue: IMergedCues;
  currentTime: number;
  clickHandler(seekingTime: number): void;
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

function SubtitlesCueText({ cue, clickHandler, currentTime }: IProps) {
  const [media] = useContext(MediaContext);

  if (!cue) {
    return null;
  }

  return (
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
  );
}

export default SubtitlesCueText;
