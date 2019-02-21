import React from 'react';
import StyledSvg from '../../styled/StyledSvg';
import VolumeUnmutedIcon from '../../svg/VolumeFull';
import VolumeMutedIcon from '../../svg/VolumeMuted';

const StyledVolumeMutedIcon = StyledSvg.withComponent(VolumeMutedIcon);
const StyledVolumeUnmutedIcon = StyledSvg.withComponent(VolumeUnmutedIcon);

interface IControlIcon {
  isMuted: boolean;
}

function ControlIcon({ isMuted }: IControlIcon) {
  if (isMuted) {
    return <StyledVolumeMutedIcon aria-hidden="true" />;
  }

  return <StyledVolumeUnmutedIcon aria-hidden="true" />;
}

export default ControlIcon;
