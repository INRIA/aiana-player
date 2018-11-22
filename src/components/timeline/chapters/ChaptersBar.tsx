import * as React from 'react';
import { connect } from 'react-redux';
import AssistiveText from 'src/components/a11y/AssistiveText';
import { IMediaChapters } from 'src/components/chapters/ChaptersMenu';
import { IAianaState } from 'src/reducers';
import { getRandomColor } from 'src/utils/colors';
import { unitToPercent } from 'src/utils/math';
import { IRawChaptersTrack } from 'src/utils/media';
import StyledChaptersBar from './Styles';

interface IStateProps extends IMediaChapters {
  chaptersTracks: IRawChaptersTrack[];
  duration: number;
  language: string;
}

const ChaptersBar: React.SFC<IStateProps> = ({
  chaptersTracks,
  duration,
  language
}) => {
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
              backgroundColor: getRandomColor(),
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
};

const mapStateToProps = (state: IAianaState) => ({
  chaptersTracks: state.chapters.chaptersTracks,
  duration: state.player.duration,
  language: state.chapters.language
});

export default connect(mapStateToProps)(ChaptersBar);
