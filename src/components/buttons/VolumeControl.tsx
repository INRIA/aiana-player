import React from 'react';
import styled from '../../utils/styled-components';
import VolumeSlider from '../volume-slider';
import MuteButton from './mute';

const StyledDiv = styled.div`
  display: flex;
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
