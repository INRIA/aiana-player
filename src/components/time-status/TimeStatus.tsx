import * as React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from 'src/reducers/index';
import { secondsToHMS } from 'src/utils/time';
import StyledElement from './Styles';

interface IStateProps {
  currentTime: number;
  duration: number;
}

const TimeStatus: React.SFC<IStateProps> = ({ currentTime, duration }) => (
  <StyledElement className="aip-time-status">
    <span className="aip-time-current">{secondsToHMS(currentTime)}</span>
    <span> / </span>
    <span className="aip-time-duration">{secondsToHMS(duration)}</span>
  </StyledElement>
);

const mapStateToProps = (state: IAianaState) => ({
  currentTime: state.player.currentTime,
  duration: state.player.duration
});

export default connect(mapStateToProps)(TimeStatus);
