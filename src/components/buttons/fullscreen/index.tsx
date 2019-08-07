import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { toggleFullscreen } from '../../../actions/player';
import { IAianaState } from '../../../reducers';
import { isFullscreenEnabled } from '../../../utils/fullscreen';
import AssistiveText from '../../a11y/AssistiveText';
import GhostButton from '../../shared/GhostButton';
import ControlIcon from './ControlIcon';

interface IStateProps {
  isFullscreen: boolean;
  playerSelector: string;
}

interface IDispatchProps {
  toggleFullscreen(selector: string): void;
}

interface IFullscreenButton extends IStateProps, IDispatchProps {}

function FullscreenButton({
  isFullscreen,
  playerSelector,
  toggleFullscreen
}: IFullscreenButton) {
  const [t] = useTranslation();

  if (!isFullscreenEnabled()) {
    return null;
  }

  const controlText = isFullscreen
    ? t('controls.fullscreen.exit')
    : t('controls.fullscreen.enter');

  return (
    <GhostButton
      type="button"
      onClick={(evt) => {
        evt.preventDefault();
        toggleFullscreen(playerSelector);
      }}
    >
      <ControlIcon isFullscreen={isFullscreen} />
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

const mapDispatch = {
  toggleFullscreen
};

export default connect(
  mapState,
  mapDispatch
)(FullscreenButton);
