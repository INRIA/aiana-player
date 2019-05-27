import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateUIWindow } from '../actions/shared';
import {
  WINDOW_ID_ADDITIONAL_INFORMATION,
  WINDOW_ID_CHAPTERS,
  WINDOW_ID_SLIDES,
  WINDOW_ID_VIDEO,
  WINDOW_ID_TIME_MANAGEMENT
} from '../constants';
import { IAianaState } from '../reducers';
import { IUIWindow } from '../reducers/preferences';
import styled from '../utils/styled-components';
import AdditionalInformation from './AdditionalInformation';
import ChaptersMenu from './chapters/ChaptersMenu';
import Slides from './slides/Slides';
import MediaSubtitles from './Subtitles';
import TimelineBar from './timeline/Timeline';
import VideoPlayer from './video/VideoPlayer';
import VideoPlayerControls from './video/VideoPlayerControls';
import TimeSpent from './time-management/TimeSpent';

const StyledDiv = styled.div`
  height: 100%;
  width: 100%;
  max-height: 100%;
  max-width: 100%;

  position: relative;

  background-color: ${(props) => props.theme.bg};

  .aip-windows {
    /*
      timeline height is 2.25em,
      controls height is 3.5625em,
      margin is 0.3125em
    */
    height: calc(
      100% - 2.25em - 0.5em - 2.25em - 0.8125em - 0.3125em - 0.375em
    );

    position: relative;
  }
`;

interface IStateProps {
  additionalInformationText?: string;
  chaptersMenu: boolean;
  uiWindows: IUIWindow[];
}

interface IDispatchProps {
  updateWindowHandler(name: string, window: Partial<IUIWindow>): void;
}

interface IPlayerProps extends IStateProps, IDispatchProps {}

type Filter = (window: IUIWindow) => boolean;

function byName(name: string): Filter {
  return (window: IUIWindow) => {
    return window.name === name;
  };
}

function Player(props: IPlayerProps) {
  const [isDraggable, setDraggable] = useState(true);

  const {
    additionalInformationText,
    chaptersMenu,
    uiWindows,
    updateWindowHandler
  } = props;

  const chaptersWindow = uiWindows.find(byName(WINDOW_ID_CHAPTERS));
  const additionalInformationWindow = uiWindows.find(
    byName(WINDOW_ID_ADDITIONAL_INFORMATION)
  );
  const slidesWindow = uiWindows.find(byName(WINDOW_ID_SLIDES));
  const timeManagementWindow = uiWindows.find(
    byName(WINDOW_ID_TIME_MANAGEMENT)
  );
  const videoWindow = uiWindows.find(byName(WINDOW_ID_VIDEO));

  return (
    <StyledDiv>
      <div className="aip-windows">
        {chaptersWindow && chaptersMenu && (
          <ChaptersMenu
            isDraggable={isDraggable}
            toggleDraggable={setDraggable}
            uiUpdateHandler={updateWindowHandler}
            {...chaptersWindow}
          />
        )}

        {videoWindow && (
          <VideoPlayer
            isDraggable={isDraggable}
            toggleDraggable={setDraggable}
            uiUpdateHandler={updateWindowHandler}
            {...videoWindow}
          />
        )}

        {slidesWindow && (
          <Slides
            isDraggable={isDraggable}
            toggleDraggable={setDraggable}
            uiUpdateHandler={updateWindowHandler}
            {...slidesWindow}
          />
        )}

        {additionalInformationWindow && (
          <AdditionalInformation
            isDraggable={isDraggable}
            text={additionalInformationText}
            toggleDraggable={setDraggable}
            uiUpdateHandler={updateWindowHandler}
            {...additionalInformationWindow}
          />
        )}

        {timeManagementWindow && (
          <TimeSpent
            isDraggable={isDraggable}
            toggleDraggable={setDraggable}
            uiUpdateHandler={updateWindowHandler}
            {...timeManagementWindow}
          />
        )}

        <MediaSubtitles />
      </div>
      <TimelineBar />
      <VideoPlayerControls />
    </StyledDiv>
  );
}

function mapState(state: IAianaState) {
  return {
    additionalInformationText: state.player.additionalInformationText,
    chaptersMenu: state.chapters.menuEnabled,
    uiWindows: state.preferences.uiWindows
  };
}

const mapDispatch = {
  updateWindowHandler: updateUIWindow
};

export default connect(
  mapState,
  mapDispatch
)(Player);
