import * as React from 'react';
import StyledSvg from 'src/components/styled/StyledSvg';
import VolumeUnmutedIcon from 'src/components/svg/VolumeFull';
import VolumeMutedIcon from 'src/components/svg/VolumeMuted';

const StyledVolumeMutedIcon = StyledSvg.withComponent(VolumeMutedIcon);
const StyledVolumeUnmutedIcon = StyledSvg.withComponent(VolumeUnmutedIcon);

interface IControlIcon {
  isMuted: boolean;
}

const ControlIcon: React.SFC<IControlIcon> = ({ isMuted }): JSX.Element => {
  if (isMuted) {
    return <StyledVolumeMutedIcon aria-hidden="true" />;
  }

  return <StyledVolumeUnmutedIcon aria-hidden="true" />;
};

export default ControlIcon;
