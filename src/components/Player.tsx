import React, { Component } from 'react';
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
  height: 100%;
  width: 100%;
  max-height: 100%;
  max-width: 100%;

  position: relative;

  background-color: ${(props) => props.theme.bg};

  .aip-windows {
    /*
      timeline height is 2.25rem,
      controls height is 3.75rem,
      margin between the two is 0.3125rem
    */
    height: calc(100% - 6.3125rem);

    position: relative;
  }
`;

interface IStateProps {
  chaptersMenu: boolean;
  uiPlacement: IUIPlacement;
}

interface IDispatchProps {
  updateWindowHandler(name: string, window: IUIWindow): void;
}

interface IPlayerProps extends IStateProps, IDispatchProps {}

interface IState {
  isDraggable: boolean;
}

const defaultState: IState = {
  isDraggable: true
};

class Player extends Component<IPlayerProps, IState> {
  state = defaultState;

  render() {
    const { chaptersMenu, uiPlacement, updateWindowHandler } = this.props;
    return (
      <StyledDiv className="aip-player">
        <div className="aip-windows">
          {chaptersMenu && (
            <ChaptersMenu
              isDraggable={this.state.isDraggable}
              toggleDraggable={this.toggleDraggable}
              uiUpdateHandler={updateWindowHandler}
              windowId={WINDOW_ID_CHAPTERS}
              {...uiPlacement.chapters}
            />
          )}
          <VideoPlayer
            isDraggable={this.state.isDraggable}
            toggleDraggable={this.toggleDraggable}
            uiUpdateHandler={updateWindowHandler}
            windowId={WINDOW_ID_VIDEO}
            {...uiPlacement.video}
          />
          <Slides
            isDraggable={this.state.isDraggable}
            toggleDraggable={this.toggleDraggable}
            uiUpdateHandler={updateWindowHandler}
            windowId={WINDOW_ID_SLIDES}
            {...uiPlacement.slides}
          />
          <AdditionalInformation
            isDraggable={this.state.isDraggable}
            toggleDraggable={this.toggleDraggable}
            uiUpdateHandler={updateWindowHandler}
            windowId={WINDOW_ID_ADDITIONAL_INFORMATION}
            {...uiPlacement.additionalInformation}
          />
          <MediaSubtitles />
        </div>
        <TimelineBar />
        <VideoPlayerControls />
      </StyledDiv>
    );
  }

  toggleDraggable = (isDraggable: boolean) => {
    this.setState({ isDraggable });
  };
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
