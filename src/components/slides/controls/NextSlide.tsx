import React, { Component } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { nextSlide } from '../../../actions/slides';
import { IAianaState } from '../../../reducers';
import { IRawTrack } from '../../../utils/media';
import AssistiveText from '../../a11y/AssistiveText';
import GhostButton from '../../shared/GhostButton';
import StyledSvg from '../../shared/SvgIcon';
import ArrowForward from '../../svg/ArrowForward';
import { ICueBoundaries } from '../../../types';
import MediaContext from '../../../contexts/MediaContext';

interface IStateProps {
  currentTime: number;
  duration: number;
  language: string;
  slidesTracks: IRawTrack[];
}

interface IDispatchProps {
  nextSlide(boundaries: ICueBoundaries): void;
}

interface INextSlide extends IStateProps, IDispatchProps, WithTranslation {}

class NextSlide extends Component<INextSlide> {
  static contextType = MediaContext;

  render() {
    const activeSlidesTrack = this.props.slidesTracks.find(
      (track: IRawTrack) => {
        return track.language === this.props.language;
      }
    );

    if (!activeSlidesTrack) {
      return;
    }

    return (
      <GhostButton onClick={this.clickHandler}>
        <StyledSvg as={ArrowForward} />
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
    const [media] = this.context;
    const to = nextSlideCue ? nextSlideCue.startTime : this.props.duration;

    this.props.nextSlide({
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
    slidesTracks: state.slides.slidesTracks
  };
}

const mapDispatch = {
  nextSlide
};

export default connect(
  mapState,
  mapDispatch
)(withTranslation()(NextSlide));
