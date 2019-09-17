import React, { Component } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { previousSlide } from '../../../actions/slides';
import { IAianaState } from '../../../reducers';
import { IRawTrack } from '../../../utils/media';
import AssistiveText from '../../a11y/AssistiveText';
import GhostButton from '../../shared/GhostButton';
import StyledSvg from '../../shared/styled-svg';
import ArrowBackward from '../../svg/ArrowBackward';
import { ICueBoundaries } from '../../../types';
import MediaContext from '../../../contexts/MediaContext';

interface IStateProps {
  currentTime: number;
  duration: number;
  language: string;
  seekThreshold: number;
  slidesTracks: IRawTrack[];
}

interface IDispatchProps {
  previousSlide(boundaries: ICueBoundaries): void;
}

interface IPreviousSlide extends IStateProps, IDispatchProps, WithTranslation {}

// TODO: what to do when there is no slides at all?
// Disable the element? Just hide it?

class PreviousSlide extends Component<IPreviousSlide> {
  static contextType = MediaContext;

  render() {
    return (
      <GhostButton onClick={this.clickHandler}>
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
    const [media] = this.context;
    const to = previousSlideCue ? previousSlideCue.startTime : 0;

    this.props.previousSlide({
      from: this.props.currentTime,
      to
    });
    media.currentTime = to;
  };
}

function mapState(state: IAianaState) {
  return {
    currentTime: state.player.currentTime,
    duration: state.player.duration,
    language: state.slides.language,
    seekThreshold: state.preferences.previousChapterSeekThreshold,
    slidesTracks: state.slides.slidesTracks
  };
}

const mapDispatch = {
  previousSlide
};

export default connect(
  mapState,
  mapDispatch
)(withTranslation()(PreviousSlide));
