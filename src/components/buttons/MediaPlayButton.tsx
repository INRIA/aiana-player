import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import ControlText from '../controls/ControlText';
import StyledButton from '../styled/StyledButton';
import StyledSvg from '../styled/StyledSvg';
import PauseIcon from '../svg/Pause';
import PlayIcon from '../svg/PlayArrow';
import { IFocusableProps, injectFocusable } from './focusable';

interface IProps {
  isPlaying?: boolean;
  onClick?(): void;
}

const StyledPlayIcon = StyledSvg.withComponent(PlayIcon);
const StyledPauseIcon = StyledSvg.withComponent(PauseIcon);

class MediaPlayButton extends React.Component<
  IProps & InjectedIntlProps & IFocusableProps
> {
  public static defaultProps = {
    isPlaying: false,
    onClick: () => undefined
  };

  public render() {
    const controlText = this.getControlText();
    const controlIcon = this.getControlIcon();

    return (
      <StyledButton
        type="button"
        aria-label={controlText}
        onClick={this.togglePlay}
      >
        {controlIcon}
        <ControlText>{controlText}</ControlText>
      </StyledButton>
    );
  }

  private togglePlay = () => {
    this.props.onClick!();
  };

  private getControlText = (): string => {
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

  private getControlIcon = (): JSX.Element => {
    const { isPlaying } = this.props;

    if (isPlaying) {
      return <StyledPauseIcon aria-hidden={true} />;
    }
    return <StyledPlayIcon aria-hidden={true} />;
  };
}

export default injectIntl(injectFocusable(MediaPlayButton));
