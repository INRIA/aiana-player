import * as React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers/index';
import { IConnectedReduxProps } from '../../store/index';
import { hexToHsla } from '../../utils/colors';
import styled from '../../utils/styled-components';
import FullscreenButton from '../buttons/FullscreenButton';
import PlayButton from '../buttons/PlayButton';
import VolumeControl from '../buttons/VolumeControl';
import SeekBarSlider from '../seekbar/SeekBarSlider';
import TimeStatus from '../TimeStatus';

const StyledControlsWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  /* 0.5 + 0.3125 */
  padding: 0.8125em 1em 0.5em;
  background-color: ${(props) => hexToHsla(props.theme.bg, 0.9)};
`;

const StyledControls = styled.div`
  display: flex;
  justify-content: space-between;
  height: 2.25em;
  margin-top: 0.3125em;
`;

interface IProps extends IConnectedReduxProps {
  nativeControls: boolean;
}

const VideoPlayerControls: React.SFC<IProps> = ({ nativeControls }) => {
  if (nativeControls === true) {
    return null;
  }

  return (
    <StyledControlsWrapper>
      <SeekBarSlider />
      <StyledControls className="aip-controls">
        <div className="aip-controls-left">
          <PlayButton />
          <VolumeControl />
          <TimeStatus />
        </div>
        <div className="aip-controls-right">
          <FullscreenButton />
        </div>
      </StyledControls>
    </StyledControlsWrapper>
  );
};

export default connect((state: IAianaState) => ({
  nativeControls: state.player.nativeControls
}))(VideoPlayerControls);
