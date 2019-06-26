import classNames from 'classnames';
import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { requestChangeVolume } from '../../actions/player';
import { VOLUME_MAXIMUM, VOLUME_MINIMUM } from '../../constants';
import { DEFAULT_VOLUME_STEP_MULTIPLIER } from '../../constants/preferences';
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
import { CDispatch } from '../../store';
import { unitToRatio } from '../../utils/math';
import { bounded } from '../../utils/ui';
import StyledVolumeSlider from './Styles';

interface IStateProps {
  mediaSelector: string;
  volume: number;
  volumeStep: number;
}

interface IDispatchProps {
  updateVolume(mediaSelector: string, volume: number): void;
}

interface IVolumeSliderProps
  extends IStateProps,
    IDispatchProps,
    WithTranslation {}

interface IState {
  isActive: boolean;
}

const defaultState: IState = {
  isActive: false
};

class VolumeSlider extends React.Component<IVolumeSliderProps, IState> {
  sliderPosition = 0;
  sliderWidth = 0;

  readonly state = defaultState;

  render() {
    const { t } = this.props;
    const volumePercents = 100 * this.props.volume;
    const elClasses = classNames('aip-volume', { active: this.state.isActive });

    // element width is 4em, and we must ensure the handle will not go to far
    // on the edges. The button width being 1em, it should be able to move on
    // 75% of the element width;
    const position = 0.75 * volumePercents;

    return (
      <StyledVolumeSlider
        aria-label={t('controls.volume.label')}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={volumePercents}
        aria-valuetext={t('controls.volume.valuetext', {
          volumePct: volumePercents
        })}
        className={elClasses}
        onKeyDown={this.keyDownHandler}
        role="slider"
        tabIndex={0}
      >
        <div
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
      </StyledVolumeSlider>
    );
  }

  keyDownHandler = (evt: React.KeyboardEvent<HTMLDivElement>) => {
    const { mediaSelector, updateVolume, volume, volumeStep } = this.props;

    switch (evt.key) {
      case ARROW_RIGHT_KEY:
      case ARROW_UP_KEY:
        updateVolume(mediaSelector, this.safeVolume(volume + volumeStep));
        break;
      case ARROW_LEFT_KEY:
      case ARROW_DOWN_KEY:
        updateVolume(mediaSelector, this.safeVolume(volume - volumeStep));
        break;
      case PAGE_UP_KEY:
        updateVolume(
          mediaSelector,
          this.safeVolume(volume + DEFAULT_VOLUME_STEP_MULTIPLIER * volumeStep)
        );
        break;
      case PAGE_DOWN_KEY:
        updateVolume(
          mediaSelector,
          this.safeVolume(volume - DEFAULT_VOLUME_STEP_MULTIPLIER * volumeStep)
        );
        break;
      case HOME_KEY:
        updateVolume(mediaSelector, VOLUME_MINIMUM);
        break;
      case END_KEY:
        updateVolume(mediaSelector, VOLUME_MAXIMUM);
        break;
    }
  };

  mouseDownHandler = (evt: React.MouseEvent<HTMLDivElement>) => {
    evt.preventDefault();

    // Force focus when element in being interacted with a pointer device.
    // This triggers `:focus` state and prevents from hiding it from the user.
    evt.currentTarget.focus();

    this.setState({
      isActive: true
    });

    // recalculate slider element position to ensure no external
    // event (such as fullscreen or window redimension) changed it.
    const slider = document.querySelector('.aip-volume-slider');
    const { left, width } = slider!.getBoundingClientRect();

    this.sliderPosition = left;
    this.sliderWidth = width;

    // trigger first recomputation to simulate simple click.
    this.updateVolume(evt.pageX, this.sliderPosition, this.sliderWidth);

    document.addEventListener('mousemove', this.mouseMoveHandler, true);
    document.addEventListener('mouseup', this.mouseUpHandler, true);
  };

  mouseUpHandler = () => {
    this.setState({ isActive: false });
    (document.querySelector('.aip-volume') as HTMLDivElement)!.blur();
    document.removeEventListener('mousemove', this.mouseMoveHandler, true);
    document.removeEventListener('mouseup', this.mouseUpHandler, true);
  };

  mouseMoveHandler = (evt: MouseEvent) => {
    this.updateVolume(evt.pageX, this.sliderPosition, this.sliderWidth);
  };

  updateVolume = (mouseX: number, sliderX: number, sliderWidth: number) => {
    const { mediaSelector, updateVolume, volume } = this.props;

    try {
      const sliderXMax = sliderX + sliderWidth;
      const boundedX = bounded(mouseX, sliderX, sliderXMax);
      const positionDifference = boundedX - sliderX;
      const newVolume = unitToRatio(positionDifference, sliderWidth);

      if (newVolume !== volume) {
        updateVolume(mediaSelector, this.safeVolume(newVolume));
      }
    } catch (error) {
      //
    }
  };

  /**
   * Ensures volume always has a valid value (between 0 and 1).
   *
   * @param inputVolume The unsafe wanted value for the volume
   */
  safeVolume(inputVolume: number): number {
    return bounded(inputVolume, VOLUME_MINIMUM, VOLUME_MAXIMUM);
  }
}

function mapState(state: IAianaState) {
  return {
    mediaSelector: state.player.mediaSelector,
    volume: state.player.volume,
    volumeStep: state.preferences.volumeStep
  };
}

function mapDispatch(dispatch: CDispatch) {
  return {
    updateVolume: (mediaSelector: string, volume: number) => {
      dispatch(requestChangeVolume(mediaSelector, volume));
    }
  };
}

export default connect(
  mapState,
  mapDispatch
)(withTranslation()(VolumeSlider));
