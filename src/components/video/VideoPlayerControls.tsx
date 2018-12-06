import * as React from 'react';
import { hexToHsla } from '../../utils/colors';
import styled from '../../utils/styled-components';
import AddBookmarkButton from '../buttons/add-bookmark/AddBookmarkButton';
import FullscreenButton from '../buttons/fullscreen/FullscreenButton';
import PlayButton from '../buttons/play/PlayButton';
import VolumeControl from '../buttons/VolumeControl';
import SeekBarSlider from '../seekbar/SeekBarSlider';
import TimeStatus from '../time-status/TimeStatus';

const StyledControlsWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  /* 0.5 + 0.3125 */
  padding: 0.8125em 1em 0.5em;
  background-color: ${(props) => hexToHsla(props.theme.bg, 0.9)};
`;

const StyledControls = styled.div`
  display: flex;
  justify-content: space-between;
  height: 2.25em;
  margin-top: 0.3125em;
`;

const VideoPlayerControls: React.SFC = () => (
  <StyledControlsWrapper>
    <SeekBarSlider />
    <StyledControls className="aip-controls">
      <div className="aip-controls-left">
        <PlayButton />
        <VolumeControl />
        <TimeStatus />
        <AddBookmarkButton />
      </div>
      <div className="aip-controls-right">
        <FullscreenButton />
      </div>
    </StyledControls>
  </StyledControlsWrapper>
);

export default VideoPlayerControls;
