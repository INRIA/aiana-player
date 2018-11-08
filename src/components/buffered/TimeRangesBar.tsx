import * as React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from 'src/reducers';
import { BufferedRanges } from 'src/utils/media';
import StyledTimeRanges from './Styles';

interface IProps {
  bufferedRanges: BufferedRanges;
  duration: number;
}

const { floor } = Math;

const TimeRangesBar: React.SFC<IProps> = ({ bufferedRanges, duration }) => (
  <StyledTimeRanges className="aip-buffered">
    <svg width="1em" height="1em" viewBox={`0 0 ${floor(duration)} 2`}>
      {bufferedRanges.map(({ end, start }, idx) => (
        <rect
          key={idx}
          width={floor(end - start)}
          height="2"
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
