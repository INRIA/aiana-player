import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { handleToggleFullscreen } from 'src/actions/player';
import AssistiveText from 'src/components/a11y/AssistiveText';
import StyledButton from 'src/components/styled/StyledButton';
import { IAianaState } from 'src/reducers/index';
import { ExtendedHTMLElement } from 'src/types';
import { isFullscreenEnabled } from 'src/utils/fullscreen';
import ControlIcon from './ControlIcon';

interface IStateProps {
  isFullscreen: boolean;
  playerElement?: ExtendedHTMLElement;
}

interface IDispatchProps {
  toggleFullscreen(element: ExtendedHTMLElement): void;
}

interface IFullscreenButton
  extends IStateProps,
    IDispatchProps,
    InjectedTranslateProps {}

class FullscreenButton extends React.Component<IFullscreenButton> {
  public render() {
    if (!isFullscreenEnabled()) {
      return;
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

    const { playerElement, toggleFullscreen } = this.props;

    if (playerElement) {
      toggleFullscreen(playerElement);
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

const mapStateToProps = (state: IAianaState) => ({
  isFullscreen: state.player.isFullscreen,
  playerElement: state.player.playerElement
});

const mapDispatchToProps = {
  toggleFullscreen: handleToggleFullscreen
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate()(FullscreenButton));
