import { FocusableProps, injectFocusable } from './focusable';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import StyledButton from '../styled/StyledButton';
import StyledSvg from '../styled/StyledSvg';
import PauseIcon from '../svg/Pause';
import PlayIcon from '../svg/PlayArrow';

interface IProps {
  isPlaying?: boolean;
  onClick?: () => void;
}

const StyledPlayIcon = StyledSvg.withComponent(PlayIcon);
const StyledPauseIcon = StyledSvg.withComponent(PauseIcon);

class MediaPlayButton extends React.Component<
  IProps & InjectedIntlProps & FocusableProps
> {
  public static defaultProps = {
    isPlaying: false,
    onClick() {}
  };

  render() {
    const controlText = this.getControlText();
    const controlIcon = this.getControlIcon();

    return (
      <StyledButton
        type="button"
        aria-label={controlText}
        className="aiana-control-btn"
        onClick={this.togglePlay}
      >
        {controlIcon}
        <span className="aiana-control-text">{controlText}</span>
      </StyledButton>
    );
  }

  private togglePlay = () => {
    this.props.onClick!();
  };

  private getControlText = () => {
    const { intl, isPlaying } = this.props;

    if (isPlaying) {
      return intl.formatMessage({
        defaultMessage: 'Pause',
        id: 'controls.pause'
      });
    }

    return intl.formatMessage({
      defaultMessage: 'Play',
      id: 'controls.play'
    });
  };

  private getControlIcon = () => {
    const { isPlaying } = this.props;

    if (isPlaying) {
      return <StyledPauseIcon />;
    }
    return <StyledPlayIcon />;
  };
}

export default injectIntl(injectFocusable(MediaPlayButton));
