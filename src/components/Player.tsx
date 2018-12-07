import * as React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from '../reducers';
import styled from '../utils/styled-components';
import MediaAdditionalInfos from './additional-infos/MediaAdditionalInfos';
import ChaptersMenu from './chapters/ChaptersMenu';
import Slides from './slides/Slides';
import MediaSubtitles from './subtitles/MediaSubtitles';
import TimelineBar from './timeline/Timeline';
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

interface IStateProps {
  chaptersMenu: boolean;
}

function Player({ chaptersMenu }: IStateProps) {
  return (
    <StyledDiv className="aip-player">
      {chaptersMenu && <ChaptersMenu />}
      <VideoPlayer />
      <Slides />
      <MediaSubtitles />
      <VideoPlayerControls />
      <TimelineBar />
      <MediaAdditionalInfos />
    </StyledDiv>
  );
}

const mapStateToProps = (state: IAianaState) => ({
  chaptersMenu: state.chapters.menuEnabled
});

export default connect(mapStateToProps)(Player);
