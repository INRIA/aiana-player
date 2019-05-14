import React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from '../reducers';
import { secondsToHMS } from '../utils/time';
import styled from '../utils/styled-components';

const StyledElement = styled.div`
  padding: 0 0.5em;
  line-height: 2.25;
  white-space: nowrap;

  span {
    font-size: 90%;
  }
`;

interface IStateProps {
  currentTime: number;
  duration: number;
}

function TimeStatus({ currentTime, duration }: IStateProps) {
  return (
    <StyledElement className="aip-time-status">
      <span role="timer">{secondsToHMS(currentTime)}</span>
      <span> / </span>
      <span>{secondsToHMS(duration)}</span>
    </StyledElement>
  );
}

function mapState(state: IAianaState) {
  return {
    currentTime: state.player.currentTime,
    duration: state.player.duration
  };
}

export default connect(mapState)(TimeStatus);
