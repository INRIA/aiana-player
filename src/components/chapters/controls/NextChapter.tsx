import React, { Component } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { seekNextChapter } from '../../../actions/chapters';
import { IAianaState } from '../../../reducers';
import { IRawChaptersTrack, isActiveTrack } from '../../../utils/media';
import AssistiveText from '../../a11y/AssistiveText';
import GhostButton from '../../shared/GhostButton';
import StyledSvg from '../../shared/styled-svg';
import SkipNext from '../../svg/SkipNext';

interface IStateProps {
  chaptersTracks: IRawChaptersTrack[];
  currentTime: number;
  duration: number;
  media?: HTMLMediaElement;
}

interface IDispatchProps {
  seekNextChapter(media: HTMLMediaElement, from: number, to: number): void;
}

interface INextChapter extends IStateProps, IDispatchProps, WithTranslation {}

// TODO: what to do when there is no chapters at all?
// Disable the element? Just hide it?

class NextChapter extends Component<INextChapter> {
  render() {
    return (
      <GhostButton onClick={this.clickHandler} type="button">
        <StyledSvg as={SkipNext} aria-hidden="true" />
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
    this.props.seekNextChapter(
      this.props.media!,
      this.props.currentTime,
      nextChapterCue ? nextChapterCue.startTime : this.props.duration
    );
  };
}

function mapState(state: IAianaState) {
  return {
    chaptersTracks: state.chapters.chaptersTracks,
    currentTime: state.player.currentTime,
    duration: state.player.duration,
    media: state.player.mediaElement
  };
}

const mapDispatch = {
  seekNextChapter
};

export default connect(
  mapState,
  mapDispatch
)(withTranslation()(NextChapter));
