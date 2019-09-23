import React, { Component } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { previousSlide } from '../../../actions/slides';
import { IAianaState } from '../../../reducers';
import { IRawTrack } from '../../../utils/media';
import AssistiveText from '../../a11y/AssistiveText';
import GhostButton from '../../shared/GhostButton';
import StyledSvg from '../../shared/SvgIcon';
import ArrowBackward from '../../svg/ArrowBackward';
import { ICueBoundaries } from '../../../types';
import MediaContext from '../../../contexts/MediaContext';
import { seek } from '../../../actions/player';

interface IStateProps {
  currentTime: number;
  duration: number;
  isSeeking: boolean;
  language: string;
  seekingTime: number;
  seekThreshold: number;
  slidesTracks: IRawTrack[];
}

interface IDispatchProps {
  previousSlide(boundaries: ICueBoundaries): void;
  seek(time: number): void;
}

interface IPreviousSlide extends IStateProps, IDispatchProps, WithTranslation {}

class PreviousSlideButton extends Component<IPreviousSlide> {
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
        <StyledSvg as={ArrowBackward} />
        <AssistiveText>
          {this.props.t('controls.play_slide_previous')}
        </AssistiveText>
      </GhostButton>
    );
  }

  clickHandler = () => {
    const {
      currentTime,
      isSeeking,
      language,
      seekingTime,
      seekThreshold
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

    const previousSlideCue = [...activeSlidesTrack.cues]
      .reverse()
      .find((cue) => cue.startTime < time - seekThreshold);

    // If there is no cue found, seek to the beginning of the media.
    const [media] = this.context;
    const to = previousSlideCue ? previousSlideCue.startTime : 0;

    this.props.previousSlide({
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
    seekThreshold: state.preferences.previousChapterSeekThreshold,
    seekingTime: state.player.seekingTime,
    slidesTracks: state.slides.slidesTracks
  };
}

const mapDispatch = {
  previousSlide,
  seek
};

export default connect(
  mapState,
  mapDispatch
)(withTranslation()(PreviousSlideButton));
