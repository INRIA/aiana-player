import * as React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from '../reducers/index';
import { IConnectedReduxProps } from '../store';
import styled from '../utils/styled-components';
import { secondsToHMS } from '../utils/time';

const { floor } = Math;

const StyledDiv = styled.div`
  display: inline-block;
  height: 2.25em;
  padding: 0 0.5em;
  line-height: 2.25em;
  white-space: nowrap;
  vertical-align: top;

  span {
    font-size: 90%;
  }
`;

interface IProps extends IConnectedReduxProps {
  currentTime: number;
  duration: number;
}

const TimeStatus: React.SFC<IProps> = ({ currentTime, duration }) => (
  <StyledDiv className="aip-time-status">
    <span className="aip-time-current">{secondsToHMS(floor(currentTime))}</span>
    <span> / </span>
    <span className="aip-time-duration">{secondsToHMS(floor(duration))}</span>
  </StyledDiv>
);

const mapStateToProps = (state: IAianaState) => ({
  currentTime: state.player.currentTime,
  duration: state.player.duration
});

export default connect(mapStateToProps)(TimeStatus);
