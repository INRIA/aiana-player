import React from 'react';
import StyledSvg from '../../styled/StyledSvg';
import PauseIcon from '../../svg/Pause';
import PlayIcon from '../../svg/PlayArrow';

interface IControlIcon {
  isPlaying: boolean;
}

function PlayControlIcon({ isPlaying }: IControlIcon) {
  if (isPlaying) {
    return <StyledSvg as={PauseIcon} aria-hidden="true" />;
  }

  return <StyledSvg as={PlayIcon} aria-hidden="true" />;
}

export default PlayControlIcon;
