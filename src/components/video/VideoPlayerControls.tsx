import * as React from 'react';
import styled from '../../utils/styled-components';
import FullscreenButton from '../buttons/FullscreenButton';
import PlayButton from '../buttons/PlayButton';
import VolumeSlider from '../buttons/VolumeSlider';

const StyledDiv = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2.25em;
  background-color: ${(props) => props.theme.bg};
`;

const VideoPlayerControls: React.SFC = () => (
  <StyledDiv className="aip-controls">
    <PlayButton />
    <VolumeSlider />
    <FullscreenButton />
  </StyledDiv>
);

export default VideoPlayerControls;
