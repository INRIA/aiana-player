import React, { Component } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
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

interface IFullscreenButton
  extends IStateProps,
    IDispatchProps,
    WithTranslation {}

class FullscreenButton extends Component<IFullscreenButton> {
  render() {
    if (!isFullscreenEnabled()) {
      return null;
    }

    return (
      <GhostButton type="button" onClick={this.clickHandler}>
        <ControlIcon isFullscreen={this.props.isFullscreen} />
        <AssistiveText>{this.getControlText()}</AssistiveText>
      </GhostButton>
    );
  }

  clickHandler = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();

    this.props.toggleFullscreen(this.props.playerSelector);
  };

  getControlText = (): string => {
    if (this.props.isFullscreen) {
      return this.props.t('controls.fullscreen.exit');
    }

    return this.props.t('controls.fullscreen.enter');
  };
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
)(withTranslation()(FullscreenButton));
