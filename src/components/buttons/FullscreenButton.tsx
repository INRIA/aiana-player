import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { ExtendedHTMLElement } from 'src/types';
import { handleToggleFullscreen } from '../../actions/player';
import { IAianaState } from '../../reducers/index';
import AssistiveText from '../a11y/AssistiveText';
import StyledButton from '../styled/StyledButton';
import StyledSvg from '../styled/StyledSvg';
import FullscreenIcon from '../svg/Fullscreen';
import FullscreenExitIcon from '../svg/FullscreenExit';

const StyledFullscreenIcon = StyledSvg.withComponent(FullscreenIcon);
const StyledFullscreenExitIcon = StyledSvg.withComponent(FullscreenExitIcon);

interface IControlIcon {
  isFullscreen: boolean;
}

const ControlIcon: React.SFC<IControlIcon> = ({ isFullscreen }) => {
  if (isFullscreen) {
    return <StyledFullscreenExitIcon aria-hidden="true" />;
  }

  return <StyledFullscreenIcon aria-hidden="true" />;
};

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
    const controlText = this.getControlText();

    return (
      <StyledButton
        type="button"
        aria-label={controlText}
        onClick={this.toggleFullscreen}
      >
        <ControlIcon isFullscreen={this.props.isFullscreen} />
        <AssistiveText>{controlText}</AssistiveText>
      </StyledButton>
    );
  }

  private toggleFullscreen = (evt: React.MouseEvent<HTMLElement>) => {
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
