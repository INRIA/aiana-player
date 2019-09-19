import React from 'react';
import StyledSvg from '../../shared/SvgIcon';
import FullscreenIcon from '../../svg/Fullscreen';
import FullscreenExitIcon from '../../svg/FullscreenExit';

interface IControlIcon {
  isFullscreen: boolean;
}

function FullscreenButtonIcon({ isFullscreen }: IControlIcon) {
  return <StyledSvg as={isFullscreen ? FullscreenExitIcon : FullscreenIcon} />;
}

export default FullscreenButtonIcon;
