import * as React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers/index';
import { IConnectedReduxProps } from '../../store/index';
import { secondsToHMS } from '../../utils/time';
import StyledElement from './Styles';

interface IProps extends IConnectedReduxProps {
  currentTime: number;
  duration: number;
}

const TimeStatus: React.SFC<IProps> = ({ currentTime, duration }) => (
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
