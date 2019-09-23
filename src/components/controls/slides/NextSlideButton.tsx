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
import { seek } from '../../../actions/player';

interface IStateProps {
  currentTime: number;
  duration: number;
  isSeeking: boolean;
  language: string;
  seekingTime: number;
  slidesTracks: IRawTrack[];
}

interface IDispatchProps {
  nextSlide(boundaries: ICueBoundaries): void;
  seek(time: number): void;
}

interface INextSlide extends IStateProps, IDispatchProps, WithTranslation {}

class NextSlideButton extends Component<INextSlide> {
  static contextType = MediaContext;

  render() {
    const activeSlidesTrack = this.props.slidesTracks.find(
      (track: IRawTrack) => {
        return track.language === this.props.language;
      }
    );

    if (!activeSlidesTrack) {
      return null;
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
    const {
      currentTime,
      duration,
      isSeeking,
      language,
      seekingTime
    } = this.props;

    const activeSlidesTrack = this.props.slidesTracks.find(
      (track: IRawTrack) => {
        return track.language === language;
      }
    );

    if (!activeSlidesTrack) {
      return;
    }

    const time = isSeeking ? seekingTime : currentTime;

    const nextSlideCue = activeSlidesTrack.cues.find((cue) => {
      return cue.startTime > time;
    });

    // If last cue is already played, seek to the end of the media.
    const [media] = this.context;
    const to = nextSlideCue ? nextSlideCue.startTime : duration;

    this.props.nextSlide({
      from: time,
      to
    });
    this.props.seek(to);

    media.currentTime = to;
  };
}

function mapState(state: IAianaState) {
  return {
    currentTime: state.player.currentTime,
    duration: state.player.duration,
    isSeeking: state.player.isSeeking,
    language: state.slides.language,
    seekingTime: state.player.seekingTime,
    slidesTracks: state.slides.slidesTracks
  };
}

const mapDispatch = {
  nextSlide,
  seek
};

export default connect(
  mapState,
  mapDispatch
)(withTranslation()(NextSlideButton));
