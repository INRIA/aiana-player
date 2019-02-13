import React from 'react';
import { I18nContextValues, withI18n } from 'react-i18next';
import { connect } from 'react-redux';
import { requestChangeVolume } from '../../actions/player';
import {
  ARROW_DOWN_KEY,
  ARROW_LEFT_KEY,
  ARROW_RIGHT_KEY,
  ARROW_UP_KEY,
  DEFAULT_VOLUME_STEP_MULTIPLIER,
  END_KEY,
  HOME_KEY,
  PAGE_DOWN_KEY,
  PAGE_UP_KEY,
  VOLUME_MAXIMUM,
  VOLUME_MINIMUM
} from '../../constants';
import { IAianaState } from '../../reducers/index';
import { CDispatch } from '../../store';
import { unitToRatio } from '../../utils/math';
import { bounded } from '../../utils/ui';
import StyledVolumeSlider from './Styles';

interface IStateProps {
  mediaElement?: HTMLMediaElement;
  volume: number;
  volumeStep: number;
}

interface IDispatchProps {
  updateVolume(media: HTMLMediaElement, volume: number): void;
}

export interface IVolumeSliderProps
  extends IStateProps,
    IDispatchProps,
    I18nContextValues {}

class VolumeSlider extends React.Component<IVolumeSliderProps> {
  elementRef = React.createRef<HTMLDivElement>();
  sliderPosition = 0;
  sliderWidth = 0;
  sliderRef = React.createRef<HTMLDivElement>();

  render() {
    const { t } = this.props;
    const volumePercents = 100 * this.props.volume;

    // element width is 4em, and we must ensure the handle will not go to far
    // on the edges. The button width being 1em, it should be able to move on
    // 75% of the element width;
    const position = 0.75 * volumePercents;

    return (
      <StyledVolumeSlider
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
      </StyledVolumeSlider>
    );
  }

  private keyDownHandler = (evt: React.KeyboardEvent<HTMLDivElement>) => {
    const { mediaElement, updateVolume, volume, volumeStep } = this.props;

    if (!mediaElement) {
      return;
    }

    switch (evt.key) {
      case ARROW_RIGHT_KEY:
      case ARROW_UP_KEY:
        updateVolume(mediaElement, this.safeVolume(volume + volumeStep));
        break;
      case ARROW_LEFT_KEY:
      case ARROW_DOWN_KEY:
        updateVolume(mediaElement, this.safeVolume(volume - volumeStep));
        break;
      case PAGE_UP_KEY:
        updateVolume(
          mediaElement,
          this.safeVolume(volume + DEFAULT_VOLUME_STEP_MULTIPLIER * volumeStep)
        );
        break;
      case PAGE_DOWN_KEY:
        updateVolume(
          mediaElement,
          this.safeVolume(volume - DEFAULT_VOLUME_STEP_MULTIPLIER * volumeStep)
        );
        break;
      case HOME_KEY:
        updateVolume(mediaElement, VOLUME_MINIMUM);
        break;
      case END_KEY:
        updateVolume(mediaElement, VOLUME_MAXIMUM);
        break;
    }
  };

  private mouseDownHandler = (evt: React.MouseEvent<HTMLDivElement>) => {
    evt.preventDefault();

    // Force focus when element in being interacted with a pointer device.
    // This triggers `:focus` state and prevents from hiding it from the user.
    evt.currentTarget.focus();

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
    const { mediaElement, updateVolume, volume } = this.props;

    if (!mediaElement) {
      return;
    }

    const positionDifference = bounded(mouseX, sliderX, sliderWidth);
    const newVolume = unitToRatio(positionDifference, sliderWidth);

    if (newVolume !== volume) {
      updateVolume(mediaElement, newVolume);
    }
  };

  /**
   * Ensures volume always has a valid value (between 0 and 1).
   *
   * @param inputVolume The unsafe wanted value for the volume
   */
  private safeVolume(inputVolume: number): number {
    return bounded(inputVolume, VOLUME_MINIMUM, VOLUME_MAXIMUM);
  }
}

function mapStateToProps(state: IAianaState) {
  return {
    mediaElement: state.player.mediaElement,
    volume: state.player.volume,
    volumeStep: state.preferences.volumeStep
  };
}

function mapDispatchToProps(dispatch: CDispatch) {
  return {
    updateVolume: (media: HTMLMediaElement, volume: number) => {
      dispatch(requestChangeVolume(media, volume));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withI18n()(VolumeSlider));
