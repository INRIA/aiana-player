import * as React from 'react';
import { connect } from 'react-redux';
import { requestChangeVolume } from '../../actions/player';
import {
  END_KEY_CODE,
  HOME_KEY_CODE,
  LEFT_ARROW_KEY_CODE,
  RIGHT_ARROW_KEY_CODE
} from '../../constants';
import { IAianaState } from '../../reducers/index';
import { IConnectedReduxProps } from '../../store/index';
import { unitToPercent } from '../../utils/math';
import styled from '../../utils/styled-components';
import { injectFocusable } from './focusable';

export interface IVolumeSliderProps {
  videoElement: HTMLVideoElement;
  volume: number;
}

const StyledDiv = styled.div`
  display: inline-block;
  width: 4em;
  height: 100%;
  cursor: pointer;

  .aip-volume-slider {
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
    touch-action: none;
  }

  .aip-volume-slider-handle {
    position: absolute;
    top: calc(50% - 0.5em);
    height: 1em;
    width: 1em;
    background-color: #fff;
    border-radius: 0.5em;

    &:before,
    &:after {
      content: ' ';
      position: absolute;
      display: block;
      top: calc(50% - 2px);
      height: 4px;
      width: 5em;
    }

    &:before {
      background-color: #fff;
      right: 0.5em;
    }

    &:after {
      background-color: hsla(0, 0%, 100%, 0.23);
      left: 0.5em;
    }
  }
`;

class VolumeSlider extends React.Component<
  IVolumeSliderProps & IConnectedReduxProps
> {
  public sliderPosition = 0;
  public sliderWidth = 0;

  public sliderRef = React.createRef<HTMLDivElement>();

  public get slider() {
    return this.sliderRef.current;
  }

  public render() {
    const { volume } = this.props;
    const volumePercents = 100 * volume;
    const position = 0.75 * volumePercents;

    return (
      <StyledDiv
        className="aip-volume"
        role="slider"
        tabIndex={0}
        aria-label="Volume level"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={volumePercents}
        aria-valuetext="TODO valeur courante"
        onKeyDown={this.keyDownHandler}
      >
        <div
          ref={this.sliderRef}
          className="aip-volume-slider"
          onMouseDownCapture={this.mouseDownHandler}
        >
          <div
            className="aip-volume-slider-handle"
            style={{
              left: `${position}%`
            }}
          />
        </div>
      </StyledDiv>
    );
  }

  private keyDownHandler = (evt: React.KeyboardEvent<HTMLDivElement>) => {
    const { dispatch, videoElement, volume } = this.props;

    switch (evt.keyCode) {
      case RIGHT_ARROW_KEY_CODE:
        dispatch(
          requestChangeVolume(
            videoElement,
            this.computeVolumeInRange(volume + 0.1)
          )
        );
        break;
      case LEFT_ARROW_KEY_CODE:
        dispatch(
          requestChangeVolume(
            videoElement,
            this.computeVolumeInRange(volume - 0.1)
          )
        );
        break;
      case HOME_KEY_CODE:
        dispatch(requestChangeVolume(videoElement, 0));
        break;
      case END_KEY_CODE:
        dispatch(requestChangeVolume(videoElement, 1));
        break;
    }
  };

  private mouseDownHandler = (evt: React.MouseEvent<HTMLDivElement>) => {
    evt.preventDefault();
    // recalculate slider element position to ensure no external
    // event (such as fullscreen or window redimension) changed it.
    const { left, width } = this.slider!.getBoundingClientRect();

    this.sliderPosition = left;
    this.sliderWidth = width;

    // trigger first recomputation to simulate simple click.
    this.diffPosition(this.sliderWidth, this.sliderPosition, evt.pageX);

    document.addEventListener('mousemove', this.mouseMoveHandler, true);
    document.addEventListener('mouseup', this.mouseUpHandler, true);
  };

  private mouseUpHandler = () => {
    document.removeEventListener('mousemove', this.mouseMoveHandler, true);
    document.removeEventListener('mouseup', this.mouseUpHandler, true);
  };

  private mouseMoveHandler = (evt: MouseEvent) => {
    this.diffPosition(this.sliderWidth, this.sliderPosition, evt.pageX);
  };

  private diffPosition = (
    sliderWidth: number,
    sliderX: number,
    mouseX: number
  ) => {
    const { dispatch, videoElement, volume } = this.props;
    const recordedDifference = mouseX - sliderX;
    let positionDifference;

    if (recordedDifference < 0) {
      positionDifference = 0;
    } else if (recordedDifference > this.sliderWidth) {
      positionDifference = this.sliderWidth;
    } else {
      positionDifference = recordedDifference;
    }

    const newVolume = unitToPercent(positionDifference, sliderWidth) / 100;
    if (newVolume !== volume) {
      dispatch(requestChangeVolume(videoElement, newVolume));
    }
  };

  private computeVolumeInRange(inputVolume: number) {
    let outputVolume = inputVolume;

    if (inputVolume < 0) {
      outputVolume = 0;
    } else if (inputVolume > 1) {
      outputVolume = 1;
    }

    return outputVolume;
  }
}

export default connect((state: IAianaState) => ({
  videoElement: state.player.videoElement,
  volume: state.player.volume
}))(injectFocusable(VolumeSlider));
