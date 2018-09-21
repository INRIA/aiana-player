import * as React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers/index';
import { IConnectedReduxProps } from '../../store/index';
import styled from '../../utils/styled-components';
import FullscreenButton from '../buttons/FullscreenButton';
import PlayButton from '../buttons/PlayButton';
import SeekBarSlider from '../buttons/SeekBarSlider';
import VolumeControl from '../buttons/VolumeControl';
import TimeStatus from '../TimeStatus';

const StyledControlsWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 3.75em;
  padding: 0.5em 1em 0;
  background-color: ${(props) => props.theme.bg};
`;

const StyledControls = styled.div`
  display: flex;
  justify-content: space-between;
  height: 2.25em;
`;

interface IProps {
  nativeControls: boolean;
}

const VideoPlayerControls: React.SFC<IProps & IConnectedReduxProps> = ({
  nativeControls
}) => {
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
