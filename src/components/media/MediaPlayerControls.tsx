import React from 'react';
import { hexToHsla } from '../../utils/colors';
import styled from '../../utils/styled-components';
import AddBookmarkButton from '../controls/AddBookmarkButton';
import FullscreenButton from '../controls/fullscreen/FullscreenButton';
import PlayButton from '../controls/play/PlayButton';
import VolumeControl from '../controls/VolumeControl';
import NextChapterButton from '../controls/chapters/NextChapterButton';
import PreviousChapterButton from '../controls/chapters/PreviousChapterButton';
import PreferencesPanel from '../preferences/PreferencesPanel';
import Progress from '../progress/Progress';
import NextSlideButton from '../controls/slides/NextSlideButton';
import PreviousSlide from '../controls/slides/PreviousSlideButton';
import TimeStatus from '../TimeStatus';
import RatingSlider from '../rating/RatingSlider';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers';

interface IProps {
  rating: number;
}

const ControlsWrapper = styled.div`
  /* height: 3.5625em */
  padding: 0.8125em 1em 0.5em;

  display: flex;
  flex-direction: column-reverse;

  background-color: ${(props) => hexToHsla(props.theme.bg, 0.9)};
`;

const Controls = styled.div`
  height: 2.25em;
  margin-top: 0.3125em;

  display: flex;
  justify-content: space-between;

  > * {
    display: flex;
  }
`;

function MediaPlayerControls(props: IProps) {
  return (
    <ControlsWrapper>
      <Controls>
        <div>
          <PlayButton />
          <PreviousSlide />
          <NextSlideButton />
          <PreviousChapterButton />
          <NextChapterButton />
          <VolumeControl />
          <TimeStatus />
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
      </Controls>
      <Progress />
    </ControlsWrapper>
  );
}

function mapState(state: IAianaState) {
  return {
    rating: state.player.rating || 0
  };
}

export default connect(mapState)(MediaPlayerControls);
