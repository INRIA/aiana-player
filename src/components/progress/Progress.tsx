import classNames from 'classnames';
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
  sliderWidth: number;
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

class Progress extends Component<ISeekBarSlider, IState> {
  static contextType = MediaContext;

  readonly state = {
    sliderWidth: 0
  };

  render() {
    const { currentTime, duration, isSeeking, seekingTime, t } = this.props;

    // If the slider is being used, its registered position should override
    // the `currentTime`. However, once media has seeked (which does not mean
    // enough data was loaded yet) and if the slider is not being used, its
    // position should be the `currentTime`.
    const sliderTime = isSeeking ? seekingTime : currentTime;

    const roundedDuration = round(duration);
    const roundedCurrentTime = round(sliderTime);

    return (
      <Div
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
          onClick={this.clickHandler}
          onKeyDown={this.keyDownHandler}
          onMouseDown={this.mouseDownHandler}
          role="slider"
          tabIndex={0}
        >
          <SeekBar>
            <SeekBarExpander />
            <BufferedTimeRanges />
          </SeekBar>

          <ElapsedTime
            currentTime={sliderTime}
            duration={duration}
            isSeeking={isSeeking}
          />
        </div>
      </Div>
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
    this.setState({
      sliderWidth: sliderEl.getBoundingClientRect().width
    });
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
    const el = document.querySelector('.aip-progress')! as HTMLElement;

    this.updateCurrentTime(evt.pageX - el.offsetLeft);

    document.addEventListener('mousemove', this.mouseMoveHandler, true);
    document.addEventListener('mouseup', this.mouseUpHandler, true);
  };

  mouseUpHandler = (evt: MouseEvent) => {
    (document.querySelector('.aip-progress__slider') as HTMLElement)!.blur();
    const el = document.querySelector('.aip-progress')! as HTMLElement;
    this.updateCurrentTime(evt.pageX - el.offsetLeft);

    document.removeEventListener('mousemove', this.mouseMoveHandler, true);
    document.removeEventListener('mouseup', this.mouseUpHandler, true);
  };

  mouseMoveHandler = (evt: MouseEvent) => {
    const el = document.querySelector('.aip-progress')! as HTMLElement;
    this.updateCurrentTime(evt.pageX - el.offsetLeft);
  };

  updateCurrentTime = (mouseX: number) => {
    const [media] = this.context;
    const {
      currentTime,
      duration
      // , seek
    } = this.props;

    const positionDifference = bounded(mouseX, 0, this.state.sliderWidth);

    const newCurrentTime = round(
      duration * unitToRatio(positionDifference, this.state.sliderWidth)
    );

    if (newCurrentTime !== currentTime) {
      media.currentTime = newCurrentTime;
      // seek(newCurrentTime);
    }
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
