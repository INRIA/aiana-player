import React from 'react';
import StyledSvg from '../../shared/styled-svg';
import PauseIcon from '../../svg/Pause';
import PlayIcon from '../../svg/PlayArrow';

interface IControlIcon {
  isPlaying: boolean;
}

function PlayControlIcon({ isPlaying }: IControlIcon) {
  return <StyledSvg as={isPlaying ? PauseIcon : PlayIcon} aria-hidden="true" />;
}

export default PlayControlIcon;
