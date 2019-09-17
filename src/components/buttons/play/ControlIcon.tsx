import React from 'react';
import StyledSvg from '../../shared/SvgIcon';
import PauseIcon from '../../svg/Pause';
import PlayIcon from '../../svg/PlayArrow';

interface IControlIcon {
  isPlaying: boolean;
}

function PlayControlIcon({ isPlaying }: IControlIcon) {
  return <StyledSvg as={isPlaying ? PauseIcon : PlayIcon} />;
}

export default PlayControlIcon;
