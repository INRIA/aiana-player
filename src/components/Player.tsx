import * as React from 'react';
import styled from 'src/utils/styled-components';
import MediaAdditionalInfos from './additional-infos/MediaAdditionalInfos';
import ChaptersMenu from './chapters/ChaptersMenu';
import Slides from './slides/Slides';
import MediaSubtitles from './subtitles/MediaSubtitles';
import VideoPlayer from './video/VideoPlayer';
import VideoPlayerControls from './video/VideoPlayerControls';

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
    <ChaptersMenu />
    <VideoPlayer />
    <Slides />
    <MediaSubtitles />
    <VideoPlayerControls />
    <MediaAdditionalInfos />
  </StyledDiv>
);

export default Player;
