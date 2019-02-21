import React from 'react';
import { connect } from 'react-redux';
import { updateUIWindow } from '../actions/shared';
import {
  WINDOW_ID_ADDITIONAL_INFORMATION,
  WINDOW_ID_CHAPTERS,
  WINDOW_ID_SLIDES,
  WINDOW_ID_VIDEO
} from '../constants';
import { IAianaState } from '../reducers';
import { IUIPlacement, IUIWindow } from '../reducers/preferences';
import styled from '../utils/styled-components';
import AdditionalInformation from './additional-information/AdditionalInformation';
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
  uiPlacement: IUIPlacement;
}

interface IDispatchProps {
  updateWindowHandler(name: string, window: IUIWindow): void;
}

interface IPlayer extends IStateProps, IDispatchProps {}

function Player({ chaptersMenu, updateWindowHandler, uiPlacement }: IPlayer) {
  return (
    <StyledDiv className="aip-player">
      {chaptersMenu && (
        <ChaptersMenu
          windowId={WINDOW_ID_CHAPTERS}
          uiUpdateHandler={updateWindowHandler}
          {...uiPlacement.chapters}
        />
      )}
      <VideoPlayer
        windowId={WINDOW_ID_VIDEO}
        uiUpdateHandler={updateWindowHandler}
        {...uiPlacement.video}
      />
      <Slides
        windowId={WINDOW_ID_SLIDES}
        uiUpdateHandler={updateWindowHandler}
        {...uiPlacement.slides}
      />
      <AdditionalInformation
        windowId={WINDOW_ID_ADDITIONAL_INFORMATION}
        uiUpdateHandler={updateWindowHandler}
        {...uiPlacement.additionalInformation}
      />
      <MediaSubtitles />
      <VideoPlayerControls />
      <TimelineBar />
    </StyledDiv>
  );
}

function mapStateToProps(state: IAianaState) {
  return {
    chaptersMenu: state.chapters.menuEnabled,
    uiPlacement: state.preferences.uiPlacement
  };
}

const mapDispatchToProps = {
  updateWindowHandler: updateUIWindow
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
