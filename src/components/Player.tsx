import * as React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from 'src/reducers';
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

interface IPlayerProps {
  chaptersMenu: boolean;
}

const Player: React.SFC<IPlayerProps> = ({ chaptersMenu }) => (
  <StyledDiv className="aip-player">
    {chaptersMenu && <ChaptersMenu />}
    <VideoPlayer />
    <Slides />
    <MediaSubtitles />
    <VideoPlayerControls />
    <MediaAdditionalInfos />
  </StyledDiv>
);

const mapStateToProps = (state: IAianaState) => ({
  chaptersMenu: state.chapters.menuEnabled
});

export default connect(mapStateToProps)(Player);
