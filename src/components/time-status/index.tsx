import React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers/index';
import { secondsToHMS } from '../../utils/time';
import StyledElement from './Styles';

interface IStateProps {
  currentTime: number;
  duration: number;
}

function TimeStatus({ currentTime, duration }: IStateProps) {
  return (
    <StyledElement className="aip-time-status">
      <span className="aip-time-current" role="timer">
        {secondsToHMS(currentTime)}
      </span>
      <span> / </span>
      <span className="aip-time-duration">{secondsToHMS(duration)}</span>
    </StyledElement>
  );
}

function mapStateToProps(state: IAianaState) {
  return {
    currentTime: state.player.currentTime,
    duration: state.player.duration
  };
}

export default connect(mapStateToProps)(TimeStatus);
