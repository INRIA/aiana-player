import React, { Component } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { seekPreviousSlide } from '../../../actions/slides';
import { IAianaState } from '../../../reducers';
import { IRawTrack } from '../../../utils/media';
import AssistiveText from '../../a11y/AssistiveText';
import GhostButton from '../../shared/GhostButton';
import StyledSvg from '../../shared/styled-svg';
import ArrowBackward from '../../svg/ArrowBackward';

interface IStateProps {
  currentTime: number;
  duration: number;
  language: string;
  mediaSelector: string;
  seekThreshold: number;
  slidesTracks: IRawTrack[];
}

interface IDispatchProps {
  seekPreviousSlide(mediaSelector: string, from: number, to: number): void;
}

interface IPreviousSlide extends IStateProps, IDispatchProps, WithTranslation {}

// TODO: what to do when there is no slides at all?
// Disable the element? Just hide it?

class PreviousSlide extends Component<IPreviousSlide> {
  render() {
    return (
      <GhostButton onClick={this.clickHandler} type="button">
        <StyledSvg as={ArrowBackward} aria-hidden="true" />
        <AssistiveText>
          {this.props.t('controls.play_slide_previous')}
        </AssistiveText>
      </GhostButton>
    );
  }

  clickHandler = () => {
    const activeSlidesTrack = this.props.slidesTracks.find(
      (track: IRawTrack) => {
        return track.language === this.props.language;
      }
    );

    if (!activeSlidesTrack) {
      return;
    }

    const previousSlideCue = [...activeSlidesTrack.cues]
      .reverse()
      .find((cue) => {
        return (
          cue.startTime < this.props.currentTime - this.props.seekThreshold
        );
      });

    // If there is no cue found, seek to the beginning of the media.
    this.props.seekPreviousSlide(
      this.props.mediaSelector,
      this.props.currentTime,
      previousSlideCue ? previousSlideCue.startTime : 0
    );
  };
}

function mapState(state: IAianaState) {
  return {
    currentTime: state.player.currentTime,
    duration: state.player.duration,
    language: state.slides.language,
    mediaSelector: state.player.mediaSelector,
    seekThreshold: state.preferences.previousChapterSeekThreshold,
    slidesTracks: state.slides.slidesTracks
  };
}

const mapDispatch = {
  seekPreviousSlide
};

export default connect(
  mapState,
  mapDispatch
)(withTranslation()(PreviousSlide));
