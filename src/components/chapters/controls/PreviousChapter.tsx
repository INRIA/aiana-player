import React, { Component } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { seekPreviousChapter } from '../../../actions/chapters';
import { IAianaState } from '../../../reducers';
import { IRawChaptersTrack, isActiveTrack } from '../../../utils/media';
import AssistiveText from '../../a11y/AssistiveText';
import StyledButton from '../../shared/styled-button';
import StyledSvg from '../../styled/StyledSvg';
import SkipPrevious from '../../svg/SkipPrevious';

interface IStateProps {
  chaptersTracks: IRawChaptersTrack[];
  currentTime: number;
  media?: HTMLMediaElement;
  seekThreshold: number;
}

interface IDispatchProps {
  seekPreviousChapter(media: HTMLMediaElement, from: number, to: number): void;
}

interface IPreviousChapter
  extends IStateProps,
    IDispatchProps,
    WithTranslation {}

// TODO: what to do when there are no chapters at all?
// Disable the element? Just hide it?

class PreviousChapter extends Component<IPreviousChapter> {
  render() {
    return (
      <StyledButton onClick={this.clickHandler} type="button">
        <StyledSvg as={SkipPrevious} aria-hidden="true" />
        <AssistiveText>
          {this.props.t('controls.play_chapter_previous')}
        </AssistiveText>
      </StyledButton>
    );
  }

  clickHandler = () => {
    const activeChaptersTrack = this.props.chaptersTracks.find(isActiveTrack);

    if (!activeChaptersTrack) {
      return;
    }

    const previousChapterCue = [...activeChaptersTrack.cues]
      .reverse()
      .find((cue) => {
        return (
          cue.startTime < this.props.currentTime - this.props.seekThreshold
        );
      });

    // If there is no cue found, seek to the beginning of the media.
    this.props.seekPreviousChapter(
      this.props.media!,
      this.props.currentTime,
      previousChapterCue ? previousChapterCue.startTime : 0
    );
  };
}

function mapStateToProps(state: IAianaState) {
  return {
    chaptersTracks: state.chapters.chaptersTracks,
    currentTime: state.player.currentTime,
    media: state.player.mediaElement,
    seekThreshold: state.preferences.previousChapterSeekThreshold
  };
}

const mapDispatchToProps = {
  seekPreviousChapter
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(PreviousChapter));
