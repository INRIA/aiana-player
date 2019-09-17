import React from 'react';
import StyledSvg from '../../shared/SvgIcon';
import VolumeUnmutedIcon from '../../svg/VolumeFull';
import VolumeMutedIcon from '../../svg/VolumeMuted';

interface IControlIcon {
  isMuted: boolean;
}

function ControlIcon({ isMuted }: IControlIcon) {
  return <StyledSvg as={isMuted ? VolumeMutedIcon : VolumeUnmutedIcon} />;
}

export default ControlIcon;
