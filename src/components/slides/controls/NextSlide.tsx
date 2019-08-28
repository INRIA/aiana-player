import React, { Component } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { seekNextSlide } from '../../../actions/slides';
import { IAianaState } from '../../../reducers';
import { IRawTrack } from '../../../utils/media';
import AssistiveText from '../../a11y/AssistiveText';
import GhostButton from '../../shared/GhostButton';
import StyledSvg from '../../shared/styled-svg';
import ArrowForward from '../../svg/ArrowForward';

interface IStateProps {
  currentTime: number;
  duration: number;
  language: string;
  mediaSelector: string;
  slidesTracks: IRawTrack[];
}

interface IDispatchProps {
  seekNextSlide(mediaSelector: string, from: number, to: number): void;
}

interface INextSlide extends IStateProps, IDispatchProps, WithTranslation {}

// TODO: what to do when there is no slides at all?
// Disable the element? Just hide it?

class NextSlide extends Component<INextSlide> {
  render() {
    return (
      <GhostButton onClick={this.clickHandler} type="button">
        <StyledSvg as={ArrowForward} aria-hidden="true" />
        <AssistiveText>
          {this.props.t('controls.play_slide_next')}
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

    const nextSlideCue = activeSlidesTrack.cues.find((cue) => {
      return cue.startTime > this.props.currentTime;
    });

    // If last cue is already played, seek to the end of the media.
    this.props.seekNextSlide(
      this.props.mediaSelector,
      this.props.currentTime,
      nextSlideCue ? nextSlideCue.startTime : this.props.duration
    );
  };
}

function mapState(state: IAianaState) {
  return {
    currentTime: state.player.currentTime,
    duration: state.player.duration,
    language: state.slides.language,
    mediaSelector: state.player.mediaSelector,
    slidesTracks: state.slides.slidesTracks
  };
}

const mapDispatch = {
  seekNextSlide
};

export default connect(
  mapState,
  mapDispatch
)(withTranslation()(NextSlide));
