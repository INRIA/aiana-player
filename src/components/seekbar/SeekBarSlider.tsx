import * as classNames from 'classnames';
import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { requestSeek } from 'src/actions/player';
import {
  ARROW_DOWN_KEY,
  ARROW_LEFT_KEY,
  ARROW_RIGHT_KEY,
  ARROW_UP_KEY,
  DEFAULT_SEEK_STEP_MULTIPLIER,
  END_KEY,
  HOME_KEY,
  PAGE_DOWN_KEY,
  PAGE_UP_KEY
} from 'src/constants';
import { IAianaState } from 'src/reducers/index';
import { unitToPercent } from 'src/utils/math';
import { durationTranslationKey, secondsToHMSObject } from 'src/utils/time';
import { bounded } from 'src/utils/ui';
import TimeRangesBar from '../buffered/TimeRangesBar';
import StyledDiv from './Styles';

const { round } = Math;

interface IProps {
  currentTime: number;
  duration: number;
  isSeeking: boolean;
  seekStep: number;
  seekingTime: number;
  mediaElement: HTMLMediaElement | null;
}

interface IDispatchProps {
  requestSeek(media: HTMLMediaElement, time: number): AnyAction;
}

interface ISeekBarSlider
  extends IProps,
    IDispatchProps,
    InjectedTranslateProps {}

class SeekBarSlider extends React.Component<ISeekBarSlider> {
  public sliderRef = React.createRef<HTMLDivElement>();
  public sliderPosition: number = 0;
  public sliderWidth: number = 0;

  public render() {
    const {
      currentTime,
      duration,
      isSeeking,
      seekingTime,
      t,
      mediaElement
    } = this.props;

    if (!mediaElement) {
      return null;
    }

    this.setPosition(this.sliderRef.current);

    // If the slider is being used, its registered position should override
    // the `currentTime`. However, once media has seeked (which does not mean
    // enough data was loaded yet) and if the slider is not being used, its
    // position should be the `currentTime`.
    const sliderTime = isSeeking ? seekingTime : currentTime;

    const progressRatio = unitToPercent(sliderTime, duration) / 100;

    const roundedDuration = round(duration);
    const roundedCurrentTime = round(sliderTime);

    const wrapperClassNames = classNames({
      'aip-progress': true,
      'no-transition': isSeeking
    });

    return (
      <StyledDiv className={wrapperClassNames}>
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
          onMouseDown={this.mouseDownHandler}
        >
          <div className="aip-seekbar">
            <div className="aip-seekbar-expander" />
            <TimeRangesBar />
          </div>

          <div
            className={`aip-play-progress ${isSeeking ? 'no-transition' : ''}`}
            style={{
              transform: `scaleX(${progressRatio})`
            }}
          />

          <div
            className={`aip-progress-slider-handle ${
              isSeeking ? 'no-transition' : ''
            }`}
            style={{
              transform: `translateX(calc(${this.sliderWidth *
                progressRatio}px - 50%))`
            }}
          />
        </div>
      </StyledDiv>
    );
  }

  public setPosition(sliderElement: HTMLDivElement | null) {
    if (!sliderElement) {
      return;
    }

    // recalculate slider element position to ensure no external
    // event (such as fullscreen or window redimension) changed it.
    const { left, width } = sliderElement.getBoundingClientRect();

    this.sliderPosition = left;
    this.sliderWidth = width;
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

  public componentWillUnmount() {
    document.removeEventListener('mousemove', this.mouseMoveHandler, true);
    document.removeEventListener('mouseup', this.mouseUpHandler, true);
  }

  private mouseDownHandler = (evt: React.MouseEvent<HTMLDivElement>) => {
    evt.preventDefault();

    const sliderElement = evt.currentTarget;

    // Force focus when element in being interacted with a pointer device.
    // This triggers `:focus` state and prevents from hiding it from the user.
    sliderElement.focus();

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
    const {
      currentTime,
      duration,
      mediaElement,
      requestSeek: requestSeekAction
    } = this.props;

    if (!mediaElement) {
      return;
    }

    const positionDifference = bounded(mouseX, sliderX, sliderWidth);
    const newCurrentTime = round(
      (duration * unitToPercent(positionDifference, sliderWidth)) / 100
    );

    if (newCurrentTime !== currentTime) {
      requestSeekAction(mediaElement, newCurrentTime);
    }
  };

  private keyDownHandler = (evt: React.KeyboardEvent<HTMLDivElement>) => {
    const {
      currentTime,
      duration,
      isSeeking,
      mediaElement,
      requestSeek: requestSeekAction,
      seekStep,
      seekingTime
    } = this.props;

    if (!mediaElement) {
      return;
    }

    // User should be able to trigger this event multiple times before
    // the media `seeked` event is fired.
    // To do so, `seekingTime` should be used when the media is still seeking,
    // or the media `currentTime` when it is not seeking.
    let nextTime: number;

    const sliderTime = isSeeking ? seekingTime : currentTime;

    switch (evt.key) {
      case ARROW_RIGHT_KEY:
      case ARROW_UP_KEY:
        nextTime = this.safeTime(sliderTime + seekStep);
        requestSeekAction(mediaElement, nextTime);
        break;
      case ARROW_LEFT_KEY:
      case ARROW_DOWN_KEY:
        nextTime = this.safeTime(sliderTime - seekStep);
        requestSeekAction(mediaElement, nextTime);
        break;
      case PAGE_UP_KEY:
        nextTime = this.safeTime(
          sliderTime + DEFAULT_SEEK_STEP_MULTIPLIER * seekStep
        );
        requestSeekAction(mediaElement, nextTime);
        break;
      case PAGE_DOWN_KEY:
        nextTime = this.safeTime(
          sliderTime - DEFAULT_SEEK_STEP_MULTIPLIER * seekStep
        );
        requestSeekAction(mediaElement, nextTime);
        break;
      case HOME_KEY:
        requestSeekAction(mediaElement, 0);
        break;
      case END_KEY:
        requestSeekAction(mediaElement, duration);
        break;
    }
  };

  private safeTime(seekTime: number): number {
    return bounded(seekTime, 0, this.props.duration);
  }
}

const mapStateToProps = (state: IAianaState) => ({
  currentTime: state.player.currentTime,
  duration: state.player.duration,
  isSeeking: state.player.isSeeking,
  mediaElement: state.player.mediaElement,
  seekStep: state.preferences.seekStep,
  seekingTime: state.player.seekingTime
});

const mapDispatchToProps = {
  requestSeek
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate()(SeekBarSlider));
