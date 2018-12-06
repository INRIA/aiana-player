import classNames from 'classnames';
import * as React from 'react';
import { I18nContextValues, withI18n } from 'react-i18next';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { requestSeek } from '../../actions/player';
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
} from '../../constants';
import { IAianaState } from '../../reducers/index';
import { unitToPercent } from '../../utils/math';
import { durationTranslationKey, secondsToHMSObject } from '../../utils/time';
import { bounded } from '../../utils/ui';
import TimeRangesBar from '../buffered/TimeRangesBar';
import StyledDiv from './Styles';

const { round } = Math;

interface IState {
  sliderPosition: number;
  sliderWidth: number;
}

interface IStateProps {
  currentTime: number;
  duration: number;
  isFullscreen: boolean;
  isSeeking: boolean;
  seekStep: number;
  seekingTime: number;
  mediaElement?: HTMLMediaElement;
}

interface IDispatchProps {
  requestSeek(media: HTMLMediaElement, time: number): AnyAction;
}

interface ISeekBarSlider
  extends IStateProps,
    IDispatchProps,
    I18nContextValues {}

class SeekBarSlider extends React.Component<ISeekBarSlider, IState> {
  public sliderRef = React.createRef<HTMLDivElement>();

  public state = {
    sliderPosition: 0,
    sliderWidth: 0
  };

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
              transform: `translateX(calc(${this.state.sliderWidth *
                progressRatio}px - 50%))`
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

  public componentDidMount() {
    window.addEventListener('resize', this.setPosition);
  }

  public componentDidUpdate(prevProps: IStateProps) {
    if (
      prevProps.duration !== this.props.duration ||
      prevProps.isFullscreen !== this.props.isFullscreen
    ) {
      this.setPosition();
    }
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.setPosition);
  }

  private setPosition = () => {
    if (!this.sliderRef.current) {
      return;
    }

    // recalculate slider element position to ensure no external
    // event (such as fullscreen or window redimension) changed it.
    const { left, width } = this.sliderRef.current.getBoundingClientRect();

    this.setState({
      sliderPosition: left,
      sliderWidth: width
    });
  };

  private mouseDownHandler = (evt: React.MouseEvent<HTMLDivElement>) => {
    evt.preventDefault();

    // Force focus when element in being interacted with a pointer device.
    // This triggers `:focus` state and prevents from hiding it from the user.
    evt.currentTarget.focus();

    // trigger first recomputation to simulate simple click.
    this.updateCurrentTime(evt.pageX);

    document.addEventListener('mousemove', this.mouseMoveHandler, true);
    document.addEventListener('mouseup', this.mouseUpHandler, true);
  };

  private mouseUpHandler = (evt: MouseEvent) => {
    this.sliderRef.current!.blur();
    this.updateCurrentTime(evt.pageX);

    document.removeEventListener('mousemove', this.mouseMoveHandler, true);
    document.removeEventListener('mouseup', this.mouseUpHandler, true);
  };

  private mouseMoveHandler = (evt: MouseEvent) => {
    this.updateCurrentTime(evt.pageX);
  };

  private updateCurrentTime = (mouseX: number) => {
    const {
      currentTime,
      duration,
      mediaElement,
      requestSeek: requestSeekAction
    } = this.props;

    if (!mediaElement) {
      return;
    }

    const positionDifference = bounded(
      mouseX,
      this.state.sliderPosition,
      this.state.sliderWidth
    );
    const newCurrentTime = round(
      (duration * unitToPercent(positionDifference, this.state.sliderWidth)) /
        100
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

    const sliderTime = isSeeking ? seekingTime : currentTime;

    switch (evt.key) {
      case ARROW_RIGHT_KEY:
      case ARROW_UP_KEY:
        {
          const nextTime = this.safeTime(sliderTime + seekStep);
          requestSeekAction(mediaElement, nextTime);
        }
        break;
      case ARROW_LEFT_KEY:
      case ARROW_DOWN_KEY:
        {
          const nextTime = this.safeTime(sliderTime - seekStep);
          requestSeekAction(mediaElement, nextTime);
        }
        break;
      case PAGE_UP_KEY:
        {
          const nextTime = this.safeTime(
            sliderTime + DEFAULT_SEEK_STEP_MULTIPLIER * seekStep
          );
          requestSeekAction(mediaElement, nextTime);
        }
        break;
      case PAGE_DOWN_KEY:
        {
          const nextTime = this.safeTime(
            sliderTime - DEFAULT_SEEK_STEP_MULTIPLIER * seekStep
          );
          requestSeekAction(mediaElement, nextTime);
        }
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
  isFullscreen: state.player.isFullscreen,
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
)(withI18n()(SeekBarSlider));
