import React, { Component } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { previousChapter } from '../../../actions/chapters';
import { IAianaState } from '../../../reducers';
import { IRawTrack, isActiveTrack } from '../../../utils/media';
import AssistiveText from '../../a11y/AssistiveText';
import GhostButton from '../../shared/GhostButton';
import StyledSvg from '../../shared/SvgIcon';
import SkipPrevious from '../../svg/SkipPrevious';
import { ICueBoundaries } from '../../../types';
import MediaContext from '../../../contexts/MediaContext';

interface IStateProps {
  chaptersTracks: IRawTrack[];
  currentTime: number;
  seekThreshold: number;
}

interface IDispatchProps {
  previousChapter(boundaries: ICueBoundaries): void;
}

interface IPreviousChapter
  extends IStateProps,
    IDispatchProps,
    WithTranslation {}

class PreviousChapterButton extends Component<IPreviousChapter> {
  static contextType = MediaContext;

  render() {
    const activeChaptersTrack = this.props.chaptersTracks.find(isActiveTrack);

    if (!activeChaptersTrack) {
      return null;
    }

    return (
      <GhostButton onClick={this.clickHandler}>
        <StyledSvg as={SkipPrevious} />
        <AssistiveText>
          {this.props.t('controls.play_chapter_previous')}
        </AssistiveText>
      </GhostButton>
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
    const [media] = this.context;
    const to = previousChapterCue ? previousChapterCue.startTime : 0;

    this.props.previousChapter({
      from: this.props.currentTime,
      to
    });
    media.currentTime = to;
  };
}

function mapState(state: IAianaState) {
  return {
    chaptersTracks: state.chapters.chaptersTracks,
    currentTime: state.player.currentTime,
    seekThreshold: state.preferences.previousChapterSeekThreshold
  };
}

const mapDispatch = {
  previousChapter
};

export default connect(
  mapState,
  mapDispatch
)(withTranslation()(PreviousChapterButton));
