import React, { Component } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
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

interface IStateProps {
  chaptersTracks: IRawTrack[];
  currentTime: number;
  duration: number;
}

interface IDispatchProps {
  nextChapter(boundaries: ICueBoundaries): void;
}

interface INextChapter extends IStateProps, IDispatchProps, WithTranslation {}

// TODO: what to do when there is no chapters at all?
// Disable the element? Just hide it?

class NextChapter extends Component<INextChapter> {
  static contextType = MediaContext;

  render() {
    return (
      <GhostButton onClick={this.clickHandler}>
        <StyledSvg as={SkipNext} />
        <AssistiveText>
          {this.props.t('controls.play_chapter_next')}
        </AssistiveText>
      </GhostButton>
    );
  }

  clickHandler = () => {
    const activeChaptersTrack = this.props.chaptersTracks.find(isActiveTrack);

    if (!activeChaptersTrack) {
      return;
    }

    const nextChapterCue = activeChaptersTrack.cues.find((cue) => {
      return cue.startTime > this.props.currentTime;
    });

    // If last cue is already played, seek to the end of the media.
    const [media] = this.context;
    const to = nextChapterCue ? nextChapterCue.startTime : this.props.duration;

    this.props.nextChapter({
      from: this.props.currentTime,
      to
    });
    media.currentTime = to;
  };
}

function mapState(state: IAianaState) {
  return {
    chaptersTracks: state.chapters.chaptersTracks,
    currentTime: state.player.currentTime,
    duration: state.player.duration
  };
}

const mapDispatch = {
  nextChapter
};

export default connect(
  mapState,
  mapDispatch
)(withTranslation()(NextChapter));
