import * as React from 'react';
import styled from '../../utils/styled-components';
import VolumeSlider from '../volume-slider/VolumeSlider';
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
