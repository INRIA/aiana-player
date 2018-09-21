import * as React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { requestSeek } from '../../actions/player';
import {
  END_KEY_CODE,
  HOME_KEY_CODE,
  LEFT_ARROW_KEY_CODE,
  RIGHT_ARROW_KEY_CODE
} from '../../constants';
import { IAianaState } from '../../reducers/index';
import { unitToPercent } from '../../utils/math';
import { durationTranslationKey, secondsToHMSObject } from '../../utils/time';
import { ITransnected } from '../../utils/types';
import { bounded } from '../../utils/ui';
import StyledDiv from './Styles';

const { round } = Math;

interface IProps extends ITransnected {
  currentTime: number;
  duration: number;
  seekStep: number;
  videoElement: HTMLVideoElement | null;
}

class SeekBarSlider extends React.Component<IProps> {
  public sliderRef = React.createRef<HTMLDivElement>();
  public sliderPosition = 0;
  public sliderWidth = 0;

  public render() {
    const { currentTime, duration, t } = this.props;
    const progressPct = unitToPercent(currentTime, duration);
    const roundedDuration = round(duration);
    const roundedCurrentTime = round(currentTime);

    return (
      <StyledDiv className="aip-progress">
        <div
          ref={this.sliderRef}
          className="aip-progress-slider"
          role="slider"
          aria-label={t('controls.seekbar.label')}
          aria-valuemin={0}
          aria-valuemax={roundedDuration}
          aria-valuenow={roundedCurrentTime}
          aria-valuetext={this.getAriaValueText(
            roundedCurrentTime,
            roundedDuration
          )}
          tabIndex={0}
          onKeyDown={this.keyDownHandler}
          onMouseDownCapture={this.mouseDownHandler}
        >
          <div className="aip-seekbar">
            <div className="aip-seekbar-expander" />
          </div>

          <div
            className="aip-play-progress"
            style={{
              transform: `scaleX(${progressPct / 100})`
            }}
          />

          <div
            className="aip-progress-slider-handle"
            style={{
              left: `calc(${progressPct}% - 0.5em)`
            }}
          />
        </div>
      </StyledDiv>
    );
  }

  public getAriaValueText = (currentTime: number, duration: number): string => {
    const { t } = this.props;

    return t('controls.seekbar.valuetext', {
      currentTime: t(
        durationTranslationKey(currentTime),
        secondsToHMSObject(currentTime)
      ),
      duration: t(
        durationTranslationKey(duration),
        secondsToHMSObject(duration)
      )
    });
  };

  private mouseDownHandler = (evt: React.MouseEvent<HTMLDivElement>) => {
    evt.preventDefault();

    // Force focus when element in being interacted with a pointer device.
    // This triggers `:focus` state and prevents from hiding it from the user.
    this.sliderRef.current!.focus();

    // recalculate slider element position to ensure no external
    // event (such as fullscreen or window redimension) changed it.
    const { left, width } = this.sliderRef.current!.getBoundingClientRect();

    this.sliderPosition = left;
    this.sliderWidth = width;

    // trigger first recomputation to simulate simple click.
    this.updateCurrentTime(evt.pageX, this.sliderPosition, this.sliderWidth);

    document.addEventListener('mousemove', this.mouseMoveHandler, true);
    document.addEventListener('mouseup', this.mouseUpHandler, true);
  };

  private mouseUpHandler = (evt: MouseEvent) => {
    this.sliderRef.current!.blur();
    this.updateCurrentTime(evt.pageX, this.sliderPosition, this.sliderWidth);

    document.removeEventListener('mousemove', this.mouseMoveHandler, true);
    document.removeEventListener('mouseup', this.mouseUpHandler, true);
  };

  private mouseMoveHandler = (evt: MouseEvent) => {
    this.updateCurrentTime(evt.pageX, this.sliderPosition, this.sliderWidth);
  };

  private updateCurrentTime = (
    mouseX: number,
    sliderX: number,
    sliderWidth: number
  ) => {
    const { currentTime, dispatch, duration, videoElement } = this.props;

    if (!videoElement) {
      return;
    }

    const positionDifference = bounded(mouseX, sliderX, sliderWidth);
    const newCurrentTime = round(
      (duration * unitToPercent(positionDifference, sliderWidth)) / 100
    );

    if (newCurrentTime !== currentTime) {
      dispatch(requestSeek(videoElement, newCurrentTime));
    }
  };

  private keyDownHandler = (evt: React.KeyboardEvent<HTMLDivElement>) => {
    const {
      currentTime,
      dispatch,
      duration,
      seekStep,
      videoElement
    } = this.props;

    if (!videoElement) {
      return;
    }

    switch (evt.keyCode) {
      case RIGHT_ARROW_KEY_CODE:
        dispatch(
          requestSeek(videoElement, this.safeTime(currentTime + seekStep))
        );
        break;
      case LEFT_ARROW_KEY_CODE:
        dispatch(
          requestSeek(videoElement, this.safeTime(currentTime - seekStep))
        );
        break;
      case HOME_KEY_CODE:
        dispatch(requestSeek(videoElement, 0));
        break;
      case END_KEY_CODE:
        dispatch(requestSeek(videoElement, duration));
        break;
    }
  };

  private safeTime(seekTime: number): number {
    return bounded(seekTime, 0, this.props.duration);
  }
}

export default connect((state: IAianaState) => ({
  currentTime: state.player.currentTime,
  duration: state.player.duration,
  seekStep: state.preferences.seekStep,
  videoElement: state.player.videoElement
}))(translate()(SeekBarSlider));
