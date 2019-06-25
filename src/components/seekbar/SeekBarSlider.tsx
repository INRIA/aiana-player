import classNames from 'classnames';
import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { requestSeek } from '../../actions/player';
import { DEFAULT_SEEK_STEP_MULTIPLIER } from '../../constants/preferences';
import {
  ARROW_DOWN_KEY,
  ARROW_LEFT_KEY,
  ARROW_RIGHT_KEY,
  ARROW_UP_KEY,
  END_KEY,
  HOME_KEY,
  PAGE_DOWN_KEY,
  PAGE_UP_KEY
} from '../../constants/keys';
import { IAianaState } from '../../reducers';
import { unitToRatio } from '../../utils/math';
import { durationTranslationKey, secondsToHMSObject } from '../../utils/time';
import { bounded } from '../../utils/ui';
import BufferedTimeRanges from '../BufferedTimeRanges';
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
  requestSeek: any;
}

interface ISeekBarSlider extends IStateProps, IDispatchProps, WithTranslation {}

const defaultState: IState = {
  sliderPosition: 0,
  sliderWidth: 0
};

class SeekBarSlider extends React.Component<ISeekBarSlider, IState> {
  readonly state = defaultState;

  render() {
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

    const progressRatio = unitToRatio(sliderTime, duration);
    const roundedDuration = round(duration);
    const roundedCurrentTime = round(sliderTime);

    return (
      <StyledDiv
        className={classNames('aip-progress', {
          'no-transition': isSeeking
        })}
      >
        <div
          aria-label={t('controls.seekbar.label')}
          aria-valuemin={0}
          aria-valuemax={roundedDuration}
          aria-valuenow={roundedCurrentTime}
          aria-valuetext={this.getAriaValueText(
            roundedCurrentTime,
            roundedDuration
          )}
          className="aip-progress__slider"
          onKeyDown={this.keyDownHandler}
          onMouseDown={this.mouseDownHandler}
          role="slider"
          tabIndex={0}
        >
          <div className="aip-progress__seekbar">
            <div className="aip-progress__seekbar__expander" />
            <BufferedTimeRanges />
          </div>

          <div
            className={classNames('aip-progress__elapsed', {
              'no-transition': isSeeking
            })}
            style={{
              transform: `scaleX(${progressRatio})`
            }}
          />

          <div
            className={classNames('aip-progress__slider-handle', {
              'no-transition': isSeeking
            })}
            style={{
              transform: `translateX(calc(${this.state.sliderWidth *
                progressRatio}px - 50%))`
            }}
          />
        </div>
      </StyledDiv>
    );
  }

  getAriaValueText = (currentTime: number, duration: number): string => {
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

  componentDidMount() {
    window.addEventListener('resize', this.setPosition);
  }

  componentDidUpdate(prevProps: IStateProps) {
    if (
      prevProps.duration !== this.props.duration ||
      prevProps.isFullscreen !== this.props.isFullscreen
    ) {
      this.setPosition();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setPosition);
  }

  setPosition = () => {
    const sliderEl = document.querySelector('.aip-progress__slider');
    if (!sliderEl) {
      return;
    }

    // recalculate slider element position to ensure no external
    // event (such as fullscreen or window redimension) changed it.
    const { left, width } = sliderEl.getBoundingClientRect();

    this.setState({
      sliderPosition: left,
      sliderWidth: width
    });
  };

  mouseDownHandler = (evt: React.MouseEvent<HTMLDivElement>) => {
    evt.preventDefault();

    // Force focus when element in being interacted with a pointer device.
    // This triggers `:focus` state and prevents from hiding it from the user.
    evt.currentTarget.focus();

    // trigger first recomputation to simulate simple click.
    const el = document.querySelector('.aip-progress')! as HTMLDivElement;
    this.updateCurrentTime(evt.pageX - el.offsetLeft);

    document.addEventListener('mousemove', this.mouseMoveHandler, true);
    document.addEventListener('mouseup', this.mouseUpHandler, true);
  };

  mouseUpHandler = (evt: MouseEvent) => {
    (document.querySelector('.aip-progress__slider') as HTMLDivElement)!.blur();
    const el = document.querySelector('.aip-progress')! as HTMLDivElement;
    this.updateCurrentTime(evt.pageX - el.offsetLeft);

    document.removeEventListener('mousemove', this.mouseMoveHandler, true);
    document.removeEventListener('mouseup', this.mouseUpHandler, true);
  };

  mouseMoveHandler = (evt: MouseEvent) => {
    const el = document.querySelector('.aip-progress')! as HTMLDivElement;
    this.updateCurrentTime(evt.pageX - el.offsetLeft);
  };

  updateCurrentTime = (mouseX: number) => {
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
      duration * unitToRatio(positionDifference, this.state.sliderWidth)
    );

    if (newCurrentTime !== currentTime) {
      requestSeekAction(mediaElement, newCurrentTime);
    }
  };

  keyDownHandler = (evt: React.KeyboardEvent<HTMLDivElement>) => {
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

  safeTime(seekTime: number): number {
    return bounded(seekTime, 0, this.props.duration);
  }
}

function mapState(state: IAianaState) {
  return {
    currentTime: state.player.currentTime,
    duration: state.player.duration,
    isFullscreen: state.player.isFullscreen,
    isSeeking: state.player.isSeeking,
    mediaElement: state.player.mediaElement,
    seekStep: state.preferences.seekStep,
    seekingTime: state.player.seekingTime
  };
}

const mapDispatch = {
  requestSeek
};

export default connect(
  mapState,
  mapDispatch
)(withTranslation()(SeekBarSlider));
