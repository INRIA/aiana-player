import * as React from 'react';
import styled from '../utils/styled-components';
import VideoPlayer from './video/VideoPlayer';
import VideoPlayerControls from './video/VideoPlayerControls';
import VideoSubtitles from './video/VideoSubtitles';

const StyledDiv = styled.div`
  background-color: ${(props) => props.theme.bg};
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  position: relative;
  width: 100%;
`;

const Player: React.SFC = () => (
  <StyledDiv className="aip-player">
    <VideoPlayer />
    <VideoSubtitles />
    <VideoPlayerControls />
  </StyledDiv>
);

export default Player;
