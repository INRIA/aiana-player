import * as React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers/index';
import { IConnectedReduxProps } from '../../store/index';
import styled from '../../utils/styled-components';
import FullscreenButton from '../buttons/FullscreenButton';
import MuteButton from '../buttons/MuteButton';
import PlayButton from '../buttons/PlayButton';
import VolumeSlider from '../buttons/VolumeSlider';

const StyledDiv = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2.25em;
  background-color: ${(props) => props.theme.bg};
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
    <StyledDiv className="aip-controls">
      <PlayButton />
      <MuteButton />
      <VolumeSlider />
      <FullscreenButton />
    </StyledDiv>
  );
};

export default connect((state: IAianaState) => ({
  nativeControls: state.player.nativeControls
}))(VideoPlayerControls);
