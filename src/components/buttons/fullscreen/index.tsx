import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { toggleFullscreen } from '../../../actions/player';
import { IAianaState } from '../../../reducers/index';
import { ExtendedHTMLElement } from '../../../types';
import { isFullscreenEnabled } from '../../../utils/fullscreen';
import AssistiveText from '../../a11y/AssistiveText';
import StyledButton from '../../shared/styled-button';
import ControlIcon from './ControlIcon';

interface IStateProps {
  isFullscreen: boolean;
  playerElement?: ExtendedHTMLElement;
}

interface IDispatchProps {
  toggleFullscreen: any;
}

interface IFullscreenButton
  extends IStateProps,
    IDispatchProps,
    WithTranslation {}

class FullscreenButton extends React.Component<IFullscreenButton> {
  render() {
    if (!isFullscreenEnabled()) {
      return null;
    }

    return (
      <StyledButton type="button" onClick={this.clickHandler}>
        <ControlIcon isFullscreen={this.props.isFullscreen} />
        <AssistiveText>{this.getControlText()}</AssistiveText>
      </StyledButton>
    );
  }

  private clickHandler = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();

    if (this.props.playerElement) {
      this.props.toggleFullscreen(this.props.playerElement);
    }
  };

  private getControlText = (): string => {
    if (this.props.isFullscreen) {
      return this.props.t('controls.fullscreen.exit');
    }

    return this.props.t('controls.fullscreen.enter');
  };
}

function mapState(state: IAianaState) {
  return {
    isFullscreen: state.player.isFullscreen,
    playerElement: state.player.playerElement
  };
}

const mapDispatch = {
  toggleFullscreen
};

export default connect(
  mapState,
  mapDispatch
)(withTranslation()(FullscreenButton));
