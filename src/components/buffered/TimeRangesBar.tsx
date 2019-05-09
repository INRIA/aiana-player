import React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers';
import { BufferedRanges } from '../../utils/media';
import StyledTimeRanges from './Styles';

interface IStateProps {
  bufferedRanges: BufferedRanges;
  duration: number;
}

function TimeRangesBar({ bufferedRanges, duration }: IStateProps) {
  return (
    <StyledTimeRanges className="aip-buffered">
      <svg
        width="100%"
        height="1em"
        viewBox={`0 0 ${Math.floor(duration)} 10`}
        preserveAspectRatio="none"
      >
        {bufferedRanges.map(({ end, start }, idx) => (
          <path key={idx} d={`M${start} 0 H${end} V10 H${start} z`} />
        ))}
      </svg>
    </StyledTimeRanges>
  );
}

function mapState(state: IAianaState) {
  return {
    bufferedRanges: state.player.bufferedRanges,
    duration: state.player.duration
  };
}

export default connect(mapState)(TimeRangesBar);
