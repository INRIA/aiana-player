import * as React from 'react';
import VolumeSlider from 'src/components/volume-slider/VolumeSlider';
import styled from 'src/utils/styled-components';
import MuteButton from './mute/MuteButton';

const StyledDiv = styled.div`
  display: inline-block;
  height: 100%;
`;

const VolumeControl: React.SFC = () => (
  <StyledDiv>
    <MuteButton />
    <VolumeSlider />
  </StyledDiv>
);

export default VolumeControl;
