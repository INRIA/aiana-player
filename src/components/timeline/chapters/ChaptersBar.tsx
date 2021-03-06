import { randomColor } from '@dashdashzako/random-hex-color';
import React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from '../../../reducers';
import { unitToPercent } from '../../../utils/math';
import { IRawTrackExt } from '../../../utils/media';
import AssistiveText from '../../a11y/AssistiveText';
import { IMediaChapters } from '../../chapters/ChaptersMenu';
import StyledChaptersBar from './Styles';

interface IStateProps extends IMediaChapters {
  chaptersTracks: IRawTrackExt[];
  duration: number;
  language: string;
}

function ChaptersBar({ chaptersTracks, duration, language }: IStateProps) {
  // TODO: refactor with ChaptersMenu
  const activeChaptersTrack = chaptersTracks.find(
    (track) => track.language === language
  );

  if (!activeChaptersTrack) {
    return null;
  }

  return (
    <StyledChaptersBar>
      <ol>
        {activeChaptersTrack.cues.map(({ endTime, startTime, text }, idx) => (
          <li
            key={idx}
            style={{
              backgroundColor: randomColor(),
              left: `${unitToPercent(startTime, duration)}%`,
              width: `${unitToPercent(endTime - startTime, duration)}%`
            }}
          >
            <AssistiveText>{text}</AssistiveText>
          </li>
        ))}
      </ol>
    </StyledChaptersBar>
  );
}

function mapState(state: IAianaState) {
  return {
    chaptersTracks: state.chapters.chaptersTracks,
    duration: state.player.duration,
    language: state.chapters.language
  };
}

export default connect(mapState)(ChaptersBar);
