import * as React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from 'src/reducers/index';
import { IConnectedReduxProps } from 'src/store';
import { hexToHsla } from 'src/utils/colors';
import styled from 'src/utils/styled-components';
import FullscreenButton from '../buttons/fullscreen/FullscreenButton';
import PlayButton from '../buttons/play/PlayButton';
import VolumeControl from '../buttons/VolumeControl';
import SeekBarSlider from '../seekbar/SeekBarSlider';
import TimeStatus from '../time-status/TimeStatus';

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
  if (nativeControls) {
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

const mapStateToProps = (state: IAianaState) => ({
  nativeControls: state.player.nativeControls
});

export default connect(mapStateToProps)(VideoPlayerControls);
