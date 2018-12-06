import * as React from 'react';
import StyledSvg from '../../styled/StyledSvg';
import FullscreenIcon from '../../svg/Fullscreen';
import FullscreenExitIcon from '../../svg/FullscreenExit';

const StyledFullscreenIcon = StyledSvg.withComponent(FullscreenIcon);
const StyledFullscreenExitIcon = StyledSvg.withComponent(FullscreenExitIcon);

interface IControlIcon {
  isFullscreen: boolean;
}

const ControlIcon: React.SFC<IControlIcon> = ({ isFullscreen }) => {
  if (isFullscreen) {
    return <StyledFullscreenExitIcon aria-hidden="true" />;
  }

  return <StyledFullscreenIcon aria-hidden="true" />;
};

export default ControlIcon;
