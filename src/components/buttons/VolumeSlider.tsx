import * as React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { requestChangeVolume } from '../../actions/player';
import {
  END_KEY_CODE,
  HOME_KEY_CODE,
  LEFT_ARROW_KEY_CODE,
  RIGHT_ARROW_KEY_CODE,
  VOLUME_MAXIMUM,
  VOLUME_MINIMUM
} from '../../constants';
import { IAianaState } from '../../reducers/index';
import { unitToPercent } from '../../utils/math';
import styled from '../../utils/styled-components';
import { ITransnected } from '../../utils/types';

const StyledDiv = styled.div`
  display: inline-block;
  width: 0em;
  height: 100%;
  cursor: pointer;

  &.focus-visible,
  &:focus,
  &:hover {
    width: 4em;
  }

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

export interface IVolumeSliderProps extends ITransnected {
  videoElement: HTMLVideoElement | null;
  volume: number;
}

class VolumeSlider extends React.Component<IVolumeSliderProps> {
  public elementRef = React.createRef<HTMLDivElement>();
  public sliderPosition = 0;
  public sliderWidth = 0;
  public sliderRef = React.createRef<HTMLDivElement>();

  public render() {
    const { t } = this.props;
    const volumePercents = 100 * this.props.volume;

    // element width is 4em, and we must ensure the handle will not go to far
    // on the edges. The button width being 1em, it should be able to move on
    // 75% of the element width;
    const position = 0.75 * volumePercents;

    return (
      <StyledDiv
        className="aip-volume"
        innerRef={this.elementRef}
        role="slider"
        tabIndex={0}
        aria-label={t('controls.volume.label')}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={volumePercents}
        aria-valuetext={t('controls.volume.valuetext', {
          volumePct: volumePercents
        })}
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

    if (!videoElement) {
      return;
    }

    switch (evt.keyCode) {
      case RIGHT_ARROW_KEY_CODE:
        dispatch(
          requestChangeVolume(videoElement, this.safeVolume(volume + 0.1))
        );
        break;
      case LEFT_ARROW_KEY_CODE:
        dispatch(
          requestChangeVolume(videoElement, this.safeVolume(volume - 0.1))
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

    // Force focus when element in being interacted with a pointer device.
    // This triggers `:focus` state and prevents from hiding it from the user.
    this.elementRef.current!.focus();

    // recalculate slider element position to ensure no external
    // event (such as fullscreen or window redimension) changed it.
    const { left, width } = this.sliderRef.current!.getBoundingClientRect();

    this.sliderPosition = left;
    this.sliderWidth = width;

    // trigger first recomputation to simulate simple click.
    this.updateVolume(evt.pageX, this.sliderPosition, this.sliderWidth);

    document.addEventListener('mousemove', this.mouseMoveHandler, true);
    document.addEventListener('mouseup', this.mouseUpHandler, true);
  };

  private mouseUpHandler = () => {
    this.elementRef.current!.blur();
    document.removeEventListener('mousemove', this.mouseMoveHandler, true);
    document.removeEventListener('mouseup', this.mouseUpHandler, true);
  };

  private mouseMoveHandler = (evt: MouseEvent) => {
    this.updateVolume(evt.pageX, this.sliderPosition, this.sliderWidth);
  };

  private updateVolume = (
    mouseX: number,
    sliderX: number,
    sliderWidth: number
  ) => {
    const { dispatch, videoElement, volume } = this.props;

    if (!videoElement) {
      return;
    }

    const positionDifference = this.safePositionDifference(
      mouseX,
      sliderX,
      sliderWidth
    );
    const newVolume = unitToPercent(positionDifference, sliderWidth) / 100;

    if (newVolume !== volume) {
      dispatch(requestChangeVolume(videoElement, newVolume));
    }
  };

  /**
   * Calculates a position relatively to an element, bound to the element
   * position and width. It cannot be a negative value nor be greater than
   * the element width.
   *
   * @param inputX Recorded value of the pointer
   * @param elementX x axis position of the reference element
   * @param elementWidth width of the reference element
   */
  private safePositionDifference(
    inputX: number,
    elementX: number,
    elementWidth: number
  ): number {
    const relativeX = inputX - elementX;

    if (relativeX < 0) {
      return 0;
    } else if (relativeX > elementWidth) {
      return elementWidth;
    }

    return relativeX;
  }

  /**
   * Ensures volume always has a valid value (between 0 and 1).
   *
   * @param inputVolume The unsafe wanted value for the volume
   */
  private safeVolume(inputVolume: number): number {
    let outputVolume = inputVolume;

    if (inputVolume < VOLUME_MINIMUM) {
      outputVolume = VOLUME_MINIMUM;
    } else if (inputVolume > VOLUME_MAXIMUM) {
      outputVolume = VOLUME_MAXIMUM;
    }

    return outputVolume;
  }
}

export default connect((state: IAianaState) => ({
  videoElement: state.player.videoElement,
  volume: state.player.volume
}))(translate()(VolumeSlider));
