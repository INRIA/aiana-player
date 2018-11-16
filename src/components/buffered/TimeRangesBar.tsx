import * as React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from 'src/reducers';
import { BufferedRanges } from 'src/utils/media';
import StyledTimeRanges from './Styles';

interface IStateProps {
  bufferedRanges: BufferedRanges;
  duration: number;
}

const { floor } = Math;

const TimeRangesBar: React.SFC<IStateProps> = ({
  bufferedRanges,
  duration
}) => (
  <StyledTimeRanges className="aip-buffered">
    <svg
      width="1em"
      height="1em"
      viewBox={`0 0 ${floor(duration)} 1`}
      preserveAspectRatio="none"
    >
      {bufferedRanges.map(({ end, start }, idx) => (
        <rect
          key={idx}
          width={floor(end - start)}
          height="1"
          x={floor(start)}
        />
      ))}
    </svg>
  </StyledTimeRanges>
);

const mapStateToProps = (state: IAianaState) => ({
  bufferedRanges: state.player.bufferedRanges,
  duration: state.player.duration
});

export default connect(mapStateToProps)(TimeRangesBar);
