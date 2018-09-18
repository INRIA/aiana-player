import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { requestVideoPause, requestVideoPlay } from '../../actions/player';
import { IAianaState } from '../../reducers/index';
import { IConnectedReduxProps } from '../../store/index';
import AssistiveText from '../a11y/AssistiveText';
import StyledButton from '../styled/StyledButton';
import StyledSvg from '../styled/StyledSvg';
import PauseIcon from '../svg/Pause';
import PlayIcon from '../svg/PlayArrow';
import { IFocusableProps, injectFocusable } from './focusable';

interface IProps {
  isPlaying: boolean;
  videoElement: HTMLVideoElement;
}

const StyledPlayIcon = StyledSvg.withComponent(PlayIcon);
const StyledPauseIcon = StyledSvg.withComponent(PauseIcon);

interface IControlIcon {
  isPlaying: boolean;
}

const ControlIcon: React.SFC<IControlIcon> = ({ isPlaying }) => {
  if (isPlaying) {
    return <StyledPauseIcon aria-hidden={true} />;
  }

  return <StyledPlayIcon aria-hidden={true} />;
};

class PlayButton extends React.Component<
  IProps & InjectedTranslateProps & IFocusableProps & IConnectedReduxProps
> {
  public render() {
    const controlText = this.getControlText();

    return (
      <StyledButton
        type="button"
        aria-label={controlText}
        onClick={this.togglePlay}
      >
        <ControlIcon isPlaying={this.props.isPlaying} />
        <AssistiveText>{controlText}</AssistiveText>
      </StyledButton>
    );
  }

  private togglePlay = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();

    const { isPlaying, videoElement, dispatch } = this.props;

    if (isPlaying && videoElement) {
      dispatch(requestVideoPause(videoElement));
    } else if (!isPlaying && videoElement) {
      dispatch(requestVideoPlay(videoElement));
    }
  };

  private getControlText = (): string => {
    const { t, isPlaying } = this.props;

    if (isPlaying) {
      return t('controls.pause');
    }

    return t('controls.play');
  };
}

export default connect((state: IAianaState) => ({
  isPlaying: state.player.isPlaying,
  videoElement: state.player.videoElement
}))(translate()(injectFocusable(PlayButton)));
