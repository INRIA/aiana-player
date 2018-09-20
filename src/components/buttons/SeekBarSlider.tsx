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
import styled from '../../utils/styled-components';
import { durationTranslationKey, secondsToHMSObject } from '../../utils/time';
import { ITransnected } from '../../utils/types';

const { round } = Math;

const StyledDiv = styled.div`
  display: block;
  position: absolute;
  bottom: 2.25em;
  height: 0.375em;
  width: 100%;
  background-color: ${(props) => props.theme.bg};
  cursor: pointer;

  .aip-progress-slider {
    height: 0.375em;
    width: 100%;
    background-color: hsla(0, 0%, 100%, 0.3);
  }

  .aip-play-progress {
    height: 100%;
    width: 100%;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.1s cubic-bezier(0.4, 0, 1, 1);
    background-color: ${(props) => props.theme.main};
    pointer-events: none;
  }
`;

interface IProps extends ITransnected {
  currentTime: number;
  duration: number;
  seekStep: number;
  videoElement: HTMLVideoElement | null;
}

class SeekBarSlider extends React.Component<IProps> {
  public render() {
    const { currentTime, duration, t } = this.props;
    const progressPct = unitToPercent(currentTime, duration) / 100;
    const roundedDuration = round(duration);
    const roundedCurrentTime = round(currentTime);

    return (
      <StyledDiv className="aip-progress">
        <div
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
        >
          <div
            className="aip-play-progress"
            style={{
              transform: `scaleX(${progressPct})`
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
        dispatch(requestSeek(videoElement, currentTime + seekStep));
        break;
      case LEFT_ARROW_KEY_CODE:
        dispatch(requestSeek(videoElement, currentTime - seekStep));
        break;
      case HOME_KEY_CODE:
        dispatch(requestSeek(videoElement, 0));
        break;
      case END_KEY_CODE:
        dispatch(requestSeek(videoElement, duration));
        break;
    }
  };
}

export default connect((state: IAianaState) => ({
  currentTime: state.player.currentTime,
  duration: state.player.duration,
  seekStep: state.preferences.seekStep,
  videoElement: state.player.videoElement
}))(translate()(SeekBarSlider));
