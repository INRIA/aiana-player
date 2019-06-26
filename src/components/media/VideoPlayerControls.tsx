import React from 'react';
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
import RatingSlider from '../rating/RatingSlider';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers';

interface IMapSate {
  rating: number;
}

const StyledControlsWrapper = styled.div`
  /* height: 3.5625em */
  padding: 0.8125em 1em 0.5em;

  background-color: ${(props) => hexToHsla(props.theme.bg, 0.9)};
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

function VideoPlayerControls(props: IMapSate) {
  return (
    <StyledControlsWrapper>
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
          <RatingSlider
            currentRating={props.rating}
            maxRating={5}
            minRating={1}
          />
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
    rating: state.player.rating || 0
  };
}

export default connect(mapState)(VideoPlayerControls);
