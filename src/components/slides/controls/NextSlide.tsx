import React, { Component } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { seekNextSlide } from '../../../actions/slides';
import { IAianaState } from '../../../reducers';
import { IRawSlidesTrack } from '../../../utils/media';
import AssistiveText from '../../a11y/AssistiveText';
import StyledButton from '../../styled/StyledButton';
import StyledSvg from '../../styled/StyledSvg';
import ArrowForward from '../../svg/ArrowForward';

interface IStateProps {
  currentTime: number;
  duration: number;
  language: string;
  media?: HTMLMediaElement;
  slidesTracks: IRawSlidesTrack[];
}

interface IDispatchProps {
  seekNextSlide(media: HTMLMediaElement, from: number, to: number): void;
}

interface INextSlide extends IStateProps, IDispatchProps, WithTranslation {}

// TODO: what to do when there is no slides at all?
// Disable the element? Just hide it?

class NextSlide extends Component<INextSlide> {
  render() {
    return (
      <StyledButton onClick={this.clickHandler} type="button">
        <StyledSvg as={ArrowForward} aria-hidden="true" />
        <AssistiveText>
          {this.props.t('controls.play_slide_next')}
        </AssistiveText>
      </StyledButton>
    );
  }

  clickHandler = () => {
    const activeSlidesTrack = this.props.slidesTracks.find(
      (track: IRawSlidesTrack) => {
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
      this.props.media!,
      this.props.currentTime,
      nextSlideCue ? nextSlideCue.startTime : this.props.duration
    );
  };
}

function mapStateToProps(state: IAianaState) {
  return {
    currentTime: state.player.currentTime,
    duration: state.player.duration,
    language: state.slides.language,
    media: state.player.mediaElement,
    slidesTracks: state.slides.slidesTracks
  };
}

const mapDispatchToProps = {
  seekNextSlide
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(NextSlide));
