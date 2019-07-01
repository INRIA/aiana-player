import React from 'react';
import { IMergedCues } from './Transcript';
import SubtitlesCueText from './SubtitlesCueText';

interface IProps {
  cues?: IMergedCues[];
  currentTime: number;
  mediaSelector: string;
  clickHandler(mediaSelector: string, seekingTime: number): void;
}

function SubtitlesCues({
  cues,
  mediaSelector,
  clickHandler,
  currentTime
}: IProps) {
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
          mediaSelector={mediaSelector}
        />
      ))}
    </p>
  );
}

export default SubtitlesCues;
