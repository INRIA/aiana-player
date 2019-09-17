import React from 'react';
import { IMergedCues } from './Transcript';
import SubtitlesCueText from './SubtitlesCueText';

interface IProps {
  cues?: IMergedCues[];
  currentTime: number;
  clickHandler(seekingTime: number): void;
}

function SubtitlesCues({ cues, clickHandler, currentTime }: IProps) {
  if (!cues) {
    return null;
  }

  return (
    <p>
      {cues.map((cue) => (
        <SubtitlesCueText
          clickHandler={clickHandler}
          cue={cue}
          currentTime={currentTime}
          key={`subtitle_${cue.startTime}_${cue.endTime}`}
        />
      ))}
    </p>
  );
}

export default SubtitlesCues;
