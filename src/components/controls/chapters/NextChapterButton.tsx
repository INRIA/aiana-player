import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { nextChapter } from '../../../actions/chapters';
import { IAianaState } from '../../../reducers';
import { IRawTrack, isActiveTrack } from '../../../utils/media';
import AssistiveText from '../../a11y/AssistiveText';
import GhostButton from '../../shared/GhostButton';
import StyledSvg from '../../shared/SvgIcon';
import SkipNext from '../../svg/SkipNext';
import MediaContext from '../../../contexts/MediaContext';
import { ICueBoundaries } from '../../../types';
import { seek } from '../../../actions/player';

interface IStateProps {
  chaptersTracks: IRawTrack[];
  currentTime: number;
  duration: number;
  isSeeking: boolean;
  seekingTime: number;
}

interface IDispatchProps {
  nextChapter(boundaries: ICueBoundaries): void;
  seek(time: number): void;
}

interface INextChapter extends IStateProps, IDispatchProps {}

function NextChapterButton(props: INextChapter) {
  const [media] = useContext(MediaContext);
  const [t] = useTranslation();

  const activeChaptersTrack = props.chaptersTracks.find(isActiveTrack);

  if (!activeChaptersTrack) {
    return null;
  }

  const clickHandler = () => {
    const activeChaptersTrack = props.chaptersTracks.find(isActiveTrack);

    if (!activeChaptersTrack) {
      return;
    }

    const { currentTime, duration, isSeeking, seekingTime } = props;
    const time = isSeeking ? seekingTime : currentTime;

    const nextChapterCue = activeChaptersTrack.cues.find((cue) => {
      return cue.startTime > time;
    });

    // If last cue is already played, seek to the end of the media.
    const to = nextChapterCue ? nextChapterCue.startTime : duration;

    props.nextChapter({ from: time, to });
    props.seek(to);

    media.currentTime = to;
  };

  return (
    <GhostButton onClick={clickHandler}>
      <StyledSvg as={SkipNext} />
      <AssistiveText>{t('controls.play_chapter_next')}</AssistiveText>
    </GhostButton>
  );
}

function mapState(state: IAianaState) {
  return {
    chaptersTracks: state.chapters.chaptersTracks,
    currentTime: state.player.currentTime,
    duration: state.player.duration,
    isSeeking: state.player.isSeeking,
    seekingTime: state.player.seekingTime
  };
}

const mapDispatch = {
  nextChapter,
  seek
};

export default connect(
  mapState,
  mapDispatch
)(NextChapterButton);
