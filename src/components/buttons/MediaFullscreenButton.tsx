import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleFullscreen } from '../../actions/player';
import { IConnectedReduxProps } from '../../store';
import ControlText from '../controls/ControlText';
import StyledButton from '../styled/StyledButton';
import StyledSvg from '../styled/StyledSvg';
import FullscreenIcon from '../svg/Fullscreen';
import FullscreenExitIcon from '../svg/FullscreenExit';
import { IFocusableProps, injectFocusable } from './focusable';

interface IProps {
  isFullscreen: boolean;
  onClick?(): void;
}

const StyledFullscreenIcon = StyledSvg.withComponent(FullscreenIcon);
const StyledFullscreenExitIcon = StyledSvg.withComponent(FullscreenExitIcon);

class MediaFullscreenButton extends React.Component<
  IProps & InjectedIntlProps & IFocusableProps & IConnectedReduxProps
> {
  public static defaultProps = {
    onClick: () => undefined
  };

  public render() {
    const controlText = this.getControlText();
    const controlIcon = this.getControlIcon();

    return (
      <StyledButton
        type="button"
        aria-label={controlText}
        onClick={this.toggleFullscreen}
      >
        {controlIcon}
        <ControlText>{controlText}</ControlText>
      </StyledButton>
    );
  }

  private toggleFullscreen = () => {
    const { dispatch, onClick } = this.props;

    dispatch(toggleFullscreen());
    onClick!();
  };

  private getControlText = (): string => {
    const { intl, isFullscreen } = this.props;

    if (isFullscreen) {
      return intl.formatMessage({
        defaultMessage: 'Exit full screen',
        id: 'controls.fullscreen.exit'
      });
    }

    return intl.formatMessage({
      defaultMessage: 'Full screen',
      id: 'controls.fullscreen.enter'
    });
  };

  private getControlIcon = (): JSX.Element => {
    const { isFullscreen } = this.props;

    if (isFullscreen) {
      return <StyledFullscreenExitIcon />;
    }

    return <StyledFullscreenIcon />;
  };
}

export default connect((state: any) => ({
  isFullscreen: state.player.isFullscreen
}))(injectIntl(injectFocusable(MediaFullscreenButton)));
