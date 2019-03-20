import React from 'react';
import StyledSvg from '../../styled/StyledSvg';
import VolumeUnmutedIcon from '../../svg/VolumeFull';
import VolumeMutedIcon from '../../svg/VolumeMuted';

interface IControlIcon {
  isMuted: boolean;
}

function ControlIcon({ isMuted }: IControlIcon) {
  if (isMuted) {
    return <StyledSvg as={VolumeMutedIcon} aria-hidden="true" />;
  }

  return <StyledSvg as={VolumeUnmutedIcon} aria-hidden="true" />;
}

export default ControlIcon;
