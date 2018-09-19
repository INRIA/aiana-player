import * as React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers/index';
import { unitToPercent } from '../../utils/math';
import styled from '../../utils/styled-components';
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
          aria-valuetext={t('controls.seekbar.valuetext', {
            currentTime: roundedCurrentTime,
            duration: roundedDuration
          })}
          tabIndex={0}
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
}

export default connect((state: IAianaState) => ({
  currentTime: state.player.currentTime,
  duration: state.player.duration
}))(translate()(SeekBarSlider));
