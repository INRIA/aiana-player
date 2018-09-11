import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toggleMute } from '../../actions/player';
import { IAianaState } from '../../reducers/index';
import { IConnectedReduxProps } from '../../store/index';
import AssistiveText from '../a11y/AssistiveText';
import StyledButton from '../styled/StyledButton';
import StyledSvg from '../styled/StyledSvg';
import VolumeUnmutedIcon from '../svg/VolumeFull';
import VolumeMutedIcon from '../svg/VolumeMuted';
import { IFocusableProps, injectFocusable } from './focusable';

interface IProps {
  isMuted: boolean;
  videoElement: HTMLVideoElement;
}

const StyledVolumeMutedIcon = StyledSvg.withComponent(VolumeMutedIcon);
const StyledVolumeUnmutedIcon = StyledSvg.withComponent(VolumeUnmutedIcon);

class MuteButton extends React.Component<
  IProps & IConnectedReduxProps & InjectedTranslateProps & IFocusableProps
> {
  public render() {
    return (
      <StyledButton
        type="button"
        aria-label={this.getControlText()}
        onClick={this.clickHandler}
      >
        {this.getControlIcon()}
        <AssistiveText>{this.getControlText()}</AssistiveText>
      </StyledButton>
    );
  }

  private clickHandler = () => {
    const { dispatch, videoElement } = this.props;

    dispatch(toggleMute(videoElement));
  };

  private getControlIcon = () => {
    if (this.props.isMuted) {
      return <StyledVolumeMutedIcon />;
    }

    return <StyledVolumeUnmutedIcon />;
  };

  private getControlText = () => {
    const { t, isMuted } = this.props;

    if (isMuted) {
      return t('controls.unmute');
    }

    return t('controls.mute');
  };
}

export default connect((state: IAianaState) => ({
  isMuted: state.player.isMuted,
  videoElement: state.player.videoElement
}))(translate()(injectFocusable(MuteButton)));
