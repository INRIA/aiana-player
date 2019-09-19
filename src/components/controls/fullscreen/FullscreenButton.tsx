import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import {
  isFullscreenEnabled,
  toggleFullscreen
} from '../../../utils/fullscreen';
import { IAianaState } from '../../../reducers';
import AssistiveText from '../../a11y/AssistiveText';
import GhostButton from '../../shared/GhostButton';
import FullscreenButtonIcon from './FullscreenButtonIcon';

interface IFullscreenButton {
  isFullscreen: boolean;
  playerSelector: string;
}

function FullscreenButton({ isFullscreen, playerSelector }: IFullscreenButton) {
  const [t] = useTranslation();

  if (!isFullscreenEnabled()) {
    return null;
  }

  const controlText = isFullscreen
    ? t('controls.fullscreen.exit')
    : t('controls.fullscreen.enter');

  return (
    <GhostButton
      onClick={(evt) => {
        evt.preventDefault();
        toggleFullscreen(playerSelector);
      }}
    >
      <FullscreenButtonIcon isFullscreen={isFullscreen} />
      <AssistiveText>{controlText}</AssistiveText>
    </GhostButton>
  );
}

function mapState(state: IAianaState) {
  return {
    isFullscreen: state.player.isFullscreen,
    playerSelector: state.player.playerSelector
  };
}

export default connect(mapState)(FullscreenButton);
