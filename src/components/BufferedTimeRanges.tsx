import React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from '../reducers';
import { hexToHsla } from '../utils/colors';
import { ITimeRange } from '../utils/media';
import styled from '../utils/styled-components';

interface IStateProps {
  bufferedRanges: ITimeRange[];
  duration: number;
}

const StyledTimeRanges = styled.div`
  height: 100%;

  svg {
    display: block;
    width: 100%;
    height: 100%;

    fill: ${(props) => hexToHsla(props.theme.fg, 0.7)};
  }
`;

function BufferedTimeRanges({ bufferedRanges, duration }: IStateProps) {
  return (
    <StyledTimeRanges>
      <svg
        width="100%"
        height="1em"
        viewBox={`0 0 ${Math.floor(duration)} 10`}
        preserveAspectRatio="none"
      >
        {bufferedRanges.map(({ endTime, startTime }, idx) => (
          <path
            key={idx}
            d={`M${startTime} 0 H${endTime} V10 H${startTime} z`}
          />
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

export default connect(mapState)(BufferedTimeRanges);
