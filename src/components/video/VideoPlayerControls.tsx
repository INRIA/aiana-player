import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers';
import { hexToHsla } from '../../utils/colors';
import styled from '../../utils/styled-components';
import AddBookmarkButton from '../buttons/add-bookmark';
import FullscreenButton from '../buttons/fullscreen/FullscreenButton';
import PlayButton from '../buttons/play/PlayButton';
import VolumeControl from '../buttons/VolumeControl';
import NextChapter from '../chapters/controls/NextChapter';
import PreviousChapter from '../chapters/controls/PreviousChapter';
import SeekBarSlider from '../seekbar/SeekBarSlider';
import NextSlide from '../slides/controls/NextSlide';
import PreviousSlide from '../slides/controls/PreviousSlide';
import TimeStatus from '../time-status/TimeStatus';

const StyledControlsWrapper = styled.div`
  height: 3.75rem;
  padding: 0.8125rem 1rem 0.5rem;

  position: relative;

  background-color: ${(props) => hexToHsla(props.theme.bg, 0.9)};

  transition: none;

  &.inactive {
    opacity: 0;
    transition: opacity 0.1s linear;
  }
`;

const StyledControls = styled.div`
  display: flex;
  justify-content: space-between;
  height: 2.25rem;
  margin-top: 0.3125rem;
`;

interface IStateProps {
  isActive: boolean;
}

function VideoPlayerControls(props: IStateProps) {
  return (
    <StyledControlsWrapper
      className={classNames({ inactive: !props.isActive })}
    >
      <SeekBarSlider />
      <StyledControls className="aip-controls">
        <div className="aip-controls-left">
          <PreviousSlide />
          <PlayButton />
          <NextSlide />
          <PreviousChapter />
          <NextChapter />
          <TimeStatus />
          <VolumeControl />
        </div>
        <div className="aip-controls-right">
          <AddBookmarkButton />
          <FullscreenButton />
        </div>
      </StyledControls>
    </StyledControlsWrapper>
  );
}

function mapStateToProps(state: IAianaState) {
  return {
    isActive: state.preferences.isActive
  };
}

export default connect(mapStateToProps)(VideoPlayerControls);
