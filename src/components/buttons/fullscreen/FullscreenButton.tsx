import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { ExtendedHTMLElement } from 'src/types';
import { isFullscreenEnabled } from 'src/utils/fullscreen';
import { handleToggleFullscreen } from '../../../actions/player';
import { IAianaState } from '../../../reducers/index';
import AssistiveText from '../../a11y/AssistiveText';
import StyledButton from '../../styled/StyledButton';
import ControlIcon from './ControlIcon';

interface IProps {
  isFullscreen: boolean;
  playerElement: ExtendedHTMLElement | null;
}

interface IDispatchProps {
  toggleFullscreen(element: ExtendedHTMLElement): void;
}

interface IFullscreenButton
  extends IProps,
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
