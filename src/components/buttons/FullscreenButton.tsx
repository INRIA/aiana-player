import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { handleToggleFullscreen } from '../../actions/player';
import { IAianaState } from '../../reducers/index';
import { IConnectedReduxProps } from '../../store/index';
import AssistiveText from '../a11y/AssistiveText';
import StyledButton from '../styled/StyledButton';
import StyledSvg from '../styled/StyledSvg';
import FullscreenIcon from '../svg/Fullscreen';
import FullscreenExitIcon from '../svg/FullscreenExit';
import { IFocusableProps, injectFocusable } from './focusable';

interface IProps {
  isFullscreen: boolean;
  playerElement: HTMLElement;
}

const StyledFullscreenIcon = StyledSvg.withComponent(FullscreenIcon);
const StyledFullscreenExitIcon = StyledSvg.withComponent(FullscreenExitIcon);

interface IControlIcon {
  isFullscreen: boolean;
}

const ControlIcon: React.SFC<IControlIcon> = ({ isFullscreen }) => {
  if (isFullscreen) {
    return <StyledFullscreenExitIcon aria-hidden={true} />;
  }

  return <StyledFullscreenIcon aria-hidden={true} />;
};

class FullscreenButton extends React.Component<
  IProps & IFocusableProps & IConnectedReduxProps & InjectedTranslateProps
> {
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

    const { dispatch, playerElement } = this.props;

    dispatch(handleToggleFullscreen(playerElement));
  };

  private getControlText = (): string => {
    const { t, isFullscreen } = this.props;

    if (isFullscreen) {
      return t('controls.fullscreen.exit');
    }

    return t('controls.fullscreen.enter');
  };
}

export default connect((state: IAianaState) => ({
  isFullscreen: state.player.isFullscreen,
  playerElement: state.player.playerElement
}))(translate()(injectFocusable(FullscreenButton)));
