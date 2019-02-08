import React from 'react';
import { I18nContextValues, withI18n } from 'react-i18next';
import { connect } from 'react-redux';
import { toggleFullscreen } from '../../../actions/player';
import AssistiveText from '../../../components/a11y/AssistiveText';
import StyledButton from '../../../components/styled/StyledButton';
import { IAianaState } from '../../../reducers/index';
import { ExtendedHTMLElement } from '../../../types';
import { isFullscreenEnabled } from '../../../utils/fullscreen';
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
    I18nContextValues {}

class FullscreenButton extends React.Component<IFullscreenButton> {
  render() {
    if (!isFullscreenEnabled()) {
      return null;
    }

    const controlText = this.getControlText();

    return (
      <StyledButton
        type="button"
        aria-label={controlText}
        onClick={this.clickHandler}
      >
        <ControlIcon isFullscreen={this.props.isFullscreen} />
        <AssistiveText>{controlText}</AssistiveText>
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
    const { t, isFullscreen } = this.props;

    if (isFullscreen) {
      return t('controls.fullscreen.exit');
    }

    return t('controls.fullscreen.enter');
  };
}

function mapStateToProps(state: IAianaState) {
  return {
    isFullscreen: state.player.isFullscreen,
    playerElement: state.player.playerElement
  };
}

const mapDispatchToProps = {
  toggleFullscreen
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withI18n()(FullscreenButton));
