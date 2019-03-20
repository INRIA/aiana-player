import React from 'react';
import StyledSvg from '../../styled/StyledSvg';
import FullscreenIcon from '../../svg/Fullscreen';
import FullscreenExitIcon from '../../svg/FullscreenExit';

interface IControlIcon {
  isFullscreen: boolean;
}

function ControlIcon({ isFullscreen }: IControlIcon) {
  if (isFullscreen) {
    return <StyledSvg as={FullscreenExitIcon} aria-hidden="true" />;
  }

  return <StyledSvg as={FullscreenIcon} aria-hidden="true" />;
}

export default ControlIcon;
