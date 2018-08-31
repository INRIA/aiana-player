import * as React from 'react';
import styled from '../../utils/styled-components';
import MediaFullscreenButton from '../buttons/MediaFullscreenButton';
import MediaPlayButton from '../buttons/MediaPlayButton';

const StyledDiv = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: ${(props) => props.theme.bg};
`;

const VideoPlayerControls: React.SFC = () => (
  <StyledDiv>
    <MediaPlayButton />
    <MediaFullscreenButton />
  </StyledDiv>
);

export default VideoPlayerControls;
