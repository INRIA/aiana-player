import * as React from 'react';
import styled from '../../utils/styled-components';
import MediaFullscreenButton from '../buttons/MediaFullscreenButton';
import MediaPlayButton from '../buttons/MediaPlayButton';
import LanguageSwitch from '../preferences/LanguageSwitch';

const StyledDiv = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2.25em;
  background-color: ${(props) => props.theme.bg};
`;

const VideoPlayerControls: React.SFC = () => (
  <StyledDiv className="aip-controls">
    <MediaPlayButton />
    <MediaFullscreenButton />
    <LanguageSwitch />
  </StyledDiv>
);

export default VideoPlayerControls;
