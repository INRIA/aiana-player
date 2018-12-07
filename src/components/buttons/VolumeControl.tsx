import * as React from 'react';
import VolumeSlider from '../../components/volume-slider/VolumeSlider';
import styled from '../../utils/styled-components';
import MuteButton from './mute/MuteButton';

const StyledDiv = styled.div`
  display: inline-block;
  height: 100%;
`;

function VolumeControl() {
  return (
    <StyledDiv>
      <MuteButton />
      <VolumeSlider />
    </StyledDiv>
  );
}

export default VolumeControl;
