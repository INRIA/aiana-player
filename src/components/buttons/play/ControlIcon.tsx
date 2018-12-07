import * as React from 'react';
import StyledSvg from '../../styled/StyledSvg';
import PauseIcon from '../../svg/Pause';
import PlayIcon from '../../svg/PlayArrow';

const StyledPlayIcon = StyledSvg.withComponent(PlayIcon);
const StyledPauseIcon = StyledSvg.withComponent(PauseIcon);

interface IControlIcon {
  isPlaying: boolean;
}

function PlayControlIcon({ isPlaying }: IControlIcon) {
  if (isPlaying) {
    return <StyledPauseIcon aria-hidden="true" />;
  }

  return <StyledPlayIcon aria-hidden="true" />;
}

export default PlayControlIcon;
