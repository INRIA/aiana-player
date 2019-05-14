import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers';
import { hexToHsla } from '../../utils/colors';
import styled from '../../utils/styled-components';
import AddBookmarkButton from '../buttons/add-bookmark';
import FullscreenButton from '../buttons/fullscreen';
import PlayButton from '../buttons/play';
import VolumeControl from '../buttons/VolumeControl';
import NextChapter from '../chapters/controls/NextChapter';
import PreviousChapter from '../chapters/controls/PreviousChapter';
import PreferencesPanel from '../preferences/PreferencesPanel';
import SeekBarSlider from '../seekbar/SeekBarSlider';
import NextSlide from '../slides/controls/NextSlide';
import PreviousSlide from '../slides/controls/PreviousSlide';
import TimeStatus from '../TimeStatus';

const StyledControlsWrapper = styled.div`
  /* height: 3.5625em */
  padding: 0.8125em 1em 0.5em;

  background-color: ${(props) => hexToHsla(props.theme.bg, 0.9)};

  transition: none;

  &.inactive {
    opacity: 0;
    transition: opacity 0.1s linear;
  }
`;

const StyledControls = styled.div`
  height: 2.25em;
  margin-top: 0.3125em;

  display: flex;
  justify-content: space-between;

  > * {
    display: flex;
  }
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
      <StyledControls>
        <div>
          <PreviousSlide />
          <PlayButton />
          <NextSlide />
          <PreviousChapter />
          <NextChapter />
          <TimeStatus />
          <VolumeControl />
        </div>
        <div>
          <AddBookmarkButton />
          <PreferencesPanel />
          <FullscreenButton />
        </div>
      </StyledControls>
    </StyledControlsWrapper>
  );
}

function mapState(state: IAianaState) {
  return {
    isActive: state.preferences.isActive
  };
}

export default connect(mapState)(VideoPlayerControls);
