import React, { Component } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { seekPreviousSlide } from '../../../actions/slides';
import { IAianaState } from '../../../reducers';
import { IRawSlidesTrack } from '../../../utils/media';
import AssistiveText from '../../a11y/AssistiveText';
import StyledButton from '../../shared/styled-button';
import StyledSvg from '../../shared/styled-svg';
import ArrowBackward from '../../svg/ArrowBackward';

interface IStateProps {
  currentTime: number;
  duration: number;
  language: string;
  media?: HTMLMediaElement;
  seekThreshold: number;
  slidesTracks: IRawSlidesTrack[];
}

interface IDispatchProps {
  seekPreviousSlide(media: HTMLMediaElement, from: number, to: number): void;
}

interface IPreviousSlide extends IStateProps, IDispatchProps, WithTranslation {}

// TODO: what to do when there is no slides at all?
// Disable the element? Just hide it?

class PreviousSlide extends Component<IPreviousSlide> {
  render() {
    return (
      <StyledButton onClick={this.clickHandler} type="button">
        <StyledSvg as={ArrowBackward} aria-hidden="true" />
        <AssistiveText>
          {this.props.t('controls.play_slide_previous')}
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

    const previousSlideCue = [...activeSlidesTrack.cues]
      .reverse()
      .find((cue) => {
        return (
          cue.startTime < this.props.currentTime - this.props.seekThreshold
        );
      });

    // If there is no cue found, seek to the beginning of the media.
    this.props.seekPreviousSlide(
      this.props.media!,
      this.props.currentTime,
      previousSlideCue ? previousSlideCue.startTime : 0
    );
  };
}

function mapStateToProps(state: IAianaState) {
  return {
    currentTime: state.player.currentTime,
    duration: state.player.duration,
    language: state.slides.language,
    media: state.player.mediaElement,
    seekThreshold: state.preferences.previousChapterSeekThreshold,
    slidesTracks: state.slides.slidesTracks
  };
}

const mapDispatchToProps = {
  seekPreviousSlide
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(PreviousSlide));
