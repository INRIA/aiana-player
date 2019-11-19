import throttle from 'lodash.throttle';
import React, { Component } from 'react';
import styled from '../../utils/styled-components';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { seek } from '../../actions/player';
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
import BufferedTimeRanges from './BufferedTimeRanges';
import MediaContext from '../../contexts/MediaContext';
import ElapsedTime from './ElapsedTime';
import SeekBarExpander from './SeekBarExpander';
import SeekBar from './SeekBar';

interface IState {
  userInteracting: boolean;
}

interface IStateProps {
  currentTime: number;
  duration: number;
  isFullscreen: boolean;
  isSeeking: boolean;
  seekingTime: number;
  seekStep: number;
}

interface IDispatchProps {
  seek(seekingTime: number): void;
}

interface ISeekBarSlider extends IStateProps, IDispatchProps, WithTranslation {}

const { round } = Math;

const Div = styled.div`
  display: block;

  height: 0.375em;
  width: 100%;

  cursor: pointer;

  .aip-progress__slider {
    height: 0.375em;
    width: 100%;

    position: relative;

    cursor: pointer;

    outline: none;

    &[data-focus-visible-added] {
      .aip-progress__seekbar {
        outline: solid 2px ${(props) => props.theme.actionBg};
      }
    }
  }
`;

/**
 * Progress component reflects the state of the media current time, but
 * also allows seeking specific time. A naive implementation would read the
 * media current time at regular intervals, and simply set it when user requires
 * a new time.
 * However, this implementation does not work properly for a few reasons.
 * First, setting media current time can be resource consuming and setting it
 * too often results in player poor overall performance.
 * Second, setting media current time is an asynchronous operation, and
 * additional checks should be performed to know when the media is effectively
 * done updating its own current time.
 *
 * The strategy here is to let the progress follow media current time when the
 * media is playing, and to free it from media as long as a user moves the
 * reading head. It requires to have a property (`isSeeking`) available in the
 * global application state that would be `true` when user is using the seek
 * mecanism and when media current time has been properly set. This property
 * would be `false` the rest of the time, and the component would just read
 * from the media current time.
 *
 * This component will also never set the seeking property back to false, this
 * action belongs to the media scope.
 *
 * A typical scenario would be:
 *
 * 1. seeking is false
 * 2. user moves reading head, seeking is true
 * 3. user stops moving reading head, media current time update is required
 * 4. media current time is set, seeking is set back to false
 */
class Progress extends Component<ISeekBarSlider, IState> {
  static contextType = MediaContext;

  sliderPosition = 0;
  sliderWidth = 0;

  readonly state = {
    userInteracting: false
  };

  render() {
    const { currentTime, duration, isSeeking, seekingTime, t } = this.props;
    const { userInteracting } = this.state;

    // If the slider is being used, its registered position should override
    // the `currentTime`. However, once media has seeked (which does not mean
    // enough data was loaded yet) and if the slider is not being used, its
    // position should be the `currentTime`.
    const sliderTime = userInteracting || isSeeking ? seekingTime : currentTime;

    const roundedDuration = round(duration);
    const roundedCurrentTime = round(sliderTime);

    const ariaValueText = this.props.t('controls.seekbar.valuetext', {
      currentTime: t(
        durationTranslationKey(roundedCurrentTime),
        secondsToHMSObject(roundedCurrentTime)
      ),
      duration: t(
        durationTranslationKey(roundedDuration),
        secondsToHMSObject(roundedDuration)
      )
    });

    return (
      <Div className="aip-progress">
        <div
          aria-label={t('controls.seekbar.label')}
          aria-valuemin={0}
          aria-valuemax={roundedDuration}
          aria-valuenow={roundedCurrentTime}
          aria-valuetext={ariaValueText}
          className="aip-progress__slider"
          onClick={this.clickHandler}
          onKeyDown={this.keyDownHandler}
          onMouseDown={this.mouseDownHandler}
          role="slider"
          tabIndex={0}
        >
          <SeekBar className="aip-progress__seekbar">
            <SeekBarExpander />
            <BufferedTimeRanges />
          </SeekBar>

          <ElapsedTime currentTime={sliderTime} duration={duration} />
        </div>
      </Div>
    );
  }

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
    const slider = document.querySelector('.aip-progress__slider');

    if (!slider) {
      return;
    }

    // recalculate slider element position to ensure no external
    // event (such as fullscreen or window redimension) changed it.
    const { left, width } = slider!.getBoundingClientRect();

    this.sliderWidth = width;
    this.sliderPosition = left;
  };

  clickHandler = (evt: React.MouseEvent<HTMLElement>) => {
    // Force focus when element in being interacted with a pointer device.
    // This triggers `:focus` state and prevents from hiding it from the user.
    evt.currentTarget.focus();
  };

  mouseDownHandler = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    this.setPosition();

    // trigger first recomputation to simulate simple click.
    const newTime = this.getTimeFromPosition(evt.pageX);

    this.props.seek(newTime);
    this.setState({ userInteracting: true });
    this.updateCurrentTime(newTime);

    document.addEventListener('mousemove', this.mouseMoveHandler, true);
    document.addEventListener('mouseup', this.mouseUpHandler, true);
  };

  mouseUpHandler = (evt: MouseEvent) => {
    (document.querySelector('.aip-progress__slider') as HTMLElement)!.blur();

    this.setState({ userInteracting: false });
    const newTime = this.getTimeFromPosition(evt.pageX);

    this.updateCurrentTime(newTime);

    document.removeEventListener('mousemove', this.mouseMoveHandler, true);
    document.removeEventListener('mouseup', this.mouseUpHandler, true);
  };

  mouseMoveHandler = (evt: MouseEvent) => {
    const newTime = this.getTimeFromPosition(evt.pageX);

    this.props.seek(newTime);
    this.throttledUpdateCurrentTime(newTime);
  };

  updateCurrentTime = (time: number) => {
    const [media] = this.context;

    if (time !== this.props.currentTime) {
      media.currentTime = time;
    }
  };

  throttledUpdateCurrentTime = throttle(this.updateCurrentTime, 300);

  getTimeFromPosition = (mouseX: number) => {
    const { duration } = this.props;

    const sliderXMax = this.sliderPosition + this.sliderWidth;
    const boundedX = bounded(mouseX, this.sliderPosition, sliderXMax);
    const positionDifference = boundedX - this.sliderPosition;
    const time = duration * unitToRatio(positionDifference, this.sliderWidth);

    return time;
  };

  keyDownHandler = (evt: React.KeyboardEvent<HTMLElement>) => {
    const [media] = this.context;
    const {
      currentTime,
      duration,
      isSeeking,
      seek,
      seekStep,
      seekingTime
    } = this.props;

    const { userInteracting } = this.state;

    // User should be able to trigger this event multiple times before
    // the media `seeked` event is fired.
    // To do so, `seekingTime` should be used when the media is still seeking,
    // or the media `currentTime` when it is not seeking.

    const sliderTime = userInteracting || isSeeking ? seekingTime : currentTime;

    switch (evt.key) {
      case ARROW_RIGHT_KEY:
      case ARROW_UP_KEY:
        {
          const nextTime = this.safeTime(sliderTime + seekStep);
          seek(nextTime);
          media.currentTime = nextTime;
        }
        break;
      case ARROW_LEFT_KEY:
      case ARROW_DOWN_KEY:
        {
          const nextTime = this.safeTime(sliderTime - seekStep);
          seek(nextTime);
          media.currentTime = nextTime;
        }
        break;
      case PAGE_UP_KEY:
        {
          const nextTime = this.safeTime(
            sliderTime + DEFAULT_SEEK_STEP_MULTIPLIER * seekStep
          );
          seek(nextTime);
          media.currentTime = nextTime;
        }
        break;
      case PAGE_DOWN_KEY:
        {
          const nextTime = this.safeTime(
            sliderTime - DEFAULT_SEEK_STEP_MULTIPLIER * seekStep
          );
          seek(nextTime);
          media.currentTime = nextTime;
        }
        break;
      case HOME_KEY:
        seek(0);
        media.currentTime = 0;
        break;
      case END_KEY:
        seek(duration);
        media.currentTime = duration;
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
    seekStep: state.preferences.seekStep,
    seekingTime: state.player.seekingTime
  };
}

const mapDispatch = {
  seek
};

export default connect(
  mapState,
  mapDispatch
)(withTranslation()(Progress));
