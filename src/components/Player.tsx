import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateWidget } from '../actions/shared';
import {
  WIDGET_ID_ADDITIONAL_INFORMATION,
  WIDGET_ID_CHAPTERS,
  WIDGET_ID_SLIDES,
  WIDGET_ID_VIDEO,
  WIDGET_ID_TIME_MANAGEMENT
} from '../constants/widgets';
import { IAianaState } from '../reducers';
import { IWidget } from '../reducers/preferences';
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

  .aip-widgets {
    /*
      timeline height is 2.25em,
      controls height is 3.5625em,
      margin is 0.3125em
    */
    height: calc(100% - 0.5em - 2.25em - 0.8125em - 0.3125em - 0.375em);

    position: relative;
  }
`;

interface IStateProps {
  additionalInformationText?: string;
  chaptersMenu: boolean;
  widgets: IWidget[];
}

interface IDispatchProps {
  updateWidgetHandler(name: string, widget: Partial<IWidget>): void;
}

interface IPlayerProps extends IStateProps, IDispatchProps {}

type Filter = (widget: IWidget) => boolean;

function byName(name: string): Filter {
  return (widget: IWidget) => {
    return widget.name === name;
  };
}

function Player(props: IPlayerProps) {
  const [isDraggable, setDraggable] = useState(true);

  const {
    additionalInformationText,
    chaptersMenu,
    widgets,
    updateWidgetHandler
  } = props;

  const chaptersWidget = widgets.find(byName(WIDGET_ID_CHAPTERS));
  const additionalInformationWidget = widgets.find(
    byName(WIDGET_ID_ADDITIONAL_INFORMATION)
  );
  const slidesWidget = widgets.find(byName(WIDGET_ID_SLIDES));
  const timeManagementWidget = widgets.find(byName(WIDGET_ID_TIME_MANAGEMENT));
  const videoWidget = widgets.find(byName(WIDGET_ID_VIDEO));

  return (
    <StyledDiv>
      <div className="aip-widgets">
        {chaptersWidget && chaptersMenu && (
          <ChaptersMenu
            isDraggable={isDraggable}
            toggleDraggable={setDraggable}
            uiUpdateHandler={updateWidgetHandler}
            {...chaptersWidget}
          />
        )}

        {videoWidget && (
          <VideoPlayer
            isDraggable={isDraggable}
            toggleDraggable={setDraggable}
            uiUpdateHandler={updateWidgetHandler}
            {...videoWidget}
          />
        )}

        {slidesWidget && (
          <Slides
            isDraggable={isDraggable}
            toggleDraggable={setDraggable}
            uiUpdateHandler={updateWidgetHandler}
            {...slidesWidget}
          />
        )}

        {additionalInformationWidget && (
          <AdditionalInformation
            isDraggable={isDraggable}
            text={additionalInformationText}
            toggleDraggable={setDraggable}
            uiUpdateHandler={updateWidgetHandler}
            {...additionalInformationWidget}
          />
        )}

        {timeManagementWidget && (
          <TimeSpent
            isDraggable={isDraggable}
            toggleDraggable={setDraggable}
            uiUpdateHandler={updateWidgetHandler}
            {...timeManagementWidget}
          />
        )}

        <MediaSubtitles />
      </div>
      <TimelineBar display={false} />
      <VideoPlayerControls />
    </StyledDiv>
  );
}

function mapState(state: IAianaState) {
  return {
    additionalInformationText: state.player.additionalInformationText,
    chaptersMenu: state.chapters.menuEnabled,
    widgets: state.preferences.widgets
  };
}

const mapDispatch = {
  updateWidgetHandler: updateWidget
};

export default connect(
  mapState,
  mapDispatch
)(Player);
