import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { previousChapter } from '../../../actions/chapters';
import { IAianaState } from '../../../reducers';
import { IRawTrack, isActiveTrack } from '../../../utils/media';
import AssistiveText from '../../a11y/AssistiveText';
import GhostButton from '../../shared/GhostButton';
import StyledSvg from '../../shared/SvgIcon';
import SkipPrevious from '../../svg/SkipPrevious';
import { ICueBoundaries } from '../../../types';
import MediaContext from '../../../contexts/MediaContext';
import { seek } from '../../../actions/player';

interface IStateProps {
  chaptersTracks: IRawTrack[];
  currentTime: number;
  isSeeking: boolean;
  seekThreshold: number;
  seekingTime: number;
}

interface IDispatchProps {
  previousChapter(boundaries: ICueBoundaries): void;
  seek(time: number): void;
}

interface IPreviousChapter extends IStateProps, IDispatchProps {}

function PreviousChapterButton(props: IPreviousChapter) {
  const [media] = useContext(MediaContext);
  const [t] = useTranslation();

  const clickHandler = () => {
    const activeChaptersTrack = props.chaptersTracks.find(isActiveTrack);

    if (!activeChaptersTrack) {
      return;
    }

    const { currentTime, isSeeking, seekingTime, seekThreshold } = props;
    const time = isSeeking ? seekingTime : currentTime;

    const previousChapterCue = [...activeChaptersTrack.cues]
      .reverse()
      .find((cue) => cue.startTime < time - seekThreshold);

    // If there is no cue found, seek to the beginning of the media.
    const to = previousChapterCue ? previousChapterCue.startTime : 0;

    props.previousChapter({ from: time, to });
    props.seek(to);
    media.currentTime = to;
  };

  const activeChaptersTrack = props.chaptersTracks.find(isActiveTrack);

  if (!activeChaptersTrack) {
    return null;
  }

  return (
    <GhostButton onClick={clickHandler}>
      <StyledSvg as={SkipPrevious} />
      <AssistiveText>{t('controls.play_chapter_previous')}</AssistiveText>
    </GhostButton>
  );
}

function mapState(state: IAianaState) {
  return {
    chaptersTracks: state.chapters.chaptersTracks,
    currentTime: state.player.currentTime,
    isSeeking: state.player.isSeeking,
    seekThreshold: state.preferences.previousChapterSeekThreshold,
    seekingTime: state.player.seekingTime
  };
}

const mapDispatch = {
  previousChapter,
  seek
};

export default connect(
  mapState,
  mapDispatch
)(PreviousChapterButton);
