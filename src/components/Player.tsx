import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateWidget } from '../actions/shared/remote-loader';
import {
  WIDGET_ID_ADDITIONAL_INFORMATION,
  WIDGET_ID_CHAPTERS,
  WIDGET_ID_SLIDES,
  WIDGET_ID_VIDEO,
  WIDGET_ID_TIME_MANAGEMENT,
  WIDGET_ID_SUBTITLES,
  WIDGET_ID_TRANSCRIPT
} from '../constants/widgets';
import { IAianaState } from '../reducers';
import { IWidget } from '../reducers/preferences';
import styled from '../utils/styled-components';
import AdditionalInformation from './AdditionalInformation';
import ChaptersMenu from './chapters/ChaptersMenu';
import Slides from './slides/Slides';
import MediaSubtitles from './Subtitles';
import TimelineBar from './timeline/Timeline';
import MediaPlayer from './media/MediaPlayer';
import MediaPlayerControls from './media/MediaPlayerControls';
import TimeSpent from './time-management/TimeSpent';
import InteractiveTranscript from './transcript/Transcript';

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
  widgets: IWidget[];
}

interface IDispatchProps {
  updateWidgetHandler(name: string, widget: Partial<IWidget>): void;
}

interface IPlayerProps extends IStateProps, IDispatchProps {}

type Filter = (widget: IWidget) => boolean;

function byName(name: string): Filter {
  return (widget: IWidget) => widget.name === name;
}

function Player(props: IPlayerProps) {
  const [isDraggable, setDraggable] = useState(true);

  const { additionalInformationText, widgets, updateWidgetHandler } = props;

  const chaptersWidget = widgets.find(byName(WIDGET_ID_CHAPTERS));
  const additionalInformationWidget = widgets.find(
    byName(WIDGET_ID_ADDITIONAL_INFORMATION)
  );
  const slidesWidget = widgets.find(byName(WIDGET_ID_SLIDES));
  const timeManagementWidget = widgets.find(byName(WIDGET_ID_TIME_MANAGEMENT));
  const videoWidget = widgets.find(byName(WIDGET_ID_VIDEO));
  const subtitlesWidget = widgets.find(byName(WIDGET_ID_SUBTITLES));
  const transcriptWidget = widgets.find(byName(WIDGET_ID_TRANSCRIPT));

  return (
    <StyledDiv>
      <div className="aip-widgets">
        {chaptersWidget && chaptersWidget.visible && (
          <ChaptersMenu
            isDraggable={isDraggable}
            toggleDraggable={setDraggable}
            uiUpdateHandler={updateWidgetHandler}
            {...chaptersWidget}
          />
        )}

        {videoWidget && (
          <MediaPlayer
            isDraggable={isDraggable}
            toggleDraggable={setDraggable}
            uiUpdateHandler={updateWidgetHandler}
            {...videoWidget}
          />
        )}

        {slidesWidget && slidesWidget.visible && (
          <Slides
            isDraggable={isDraggable}
            toggleDraggable={setDraggable}
            uiUpdateHandler={updateWidgetHandler}
            {...slidesWidget}
          />
        )}

        {additionalInformationWidget && additionalInformationWidget.visible && (
          <AdditionalInformation
            isDraggable={isDraggable}
            text={additionalInformationText}
            toggleDraggable={setDraggable}
            uiUpdateHandler={updateWidgetHandler}
            {...additionalInformationWidget}
          />
        )}

        {timeManagementWidget && timeManagementWidget.visible && (
          <TimeSpent
            isDraggable={isDraggable}
            toggleDraggable={setDraggable}
            uiUpdateHandler={updateWidgetHandler}
            {...timeManagementWidget}
          />
        )}

        {transcriptWidget && transcriptWidget.visible && (
          <InteractiveTranscript
            isDraggable={isDraggable}
            toggleDraggable={setDraggable}
            uiUpdateHandler={updateWidgetHandler}
            {...transcriptWidget}
          />
        )}

        {subtitlesWidget && subtitlesWidget.visible && (
          <MediaSubtitles
            isDraggable={isDraggable}
            toggleDraggable={setDraggable}
            uiUpdateHandler={updateWidgetHandler}
            {...subtitlesWidget}
          />
        )}
      </div>
      <TimelineBar display={false} />
      <MediaPlayerControls />
    </StyledDiv>
  );
}

function mapState(state: IAianaState) {
  return {
    additionalInformationText: state.additionalInformation.currentText,
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
