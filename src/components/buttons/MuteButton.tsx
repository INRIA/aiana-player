import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { muteVideo, unmuteVideo } from '../../actions/player';
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

interface IControlIcon {
  isMuted: boolean;
}

const ControlIcon: React.SFC<IControlIcon> = ({ isMuted }): JSX.Element => {
  if (isMuted) {
    return <StyledVolumeMutedIcon />;
  }

  return <StyledVolumeUnmutedIcon />;
};

class MuteButton extends React.Component<
  IProps & IConnectedReduxProps & InjectedTranslateProps & IFocusableProps
> {
  public render() {
    const { isMuted } = this.props;
    const controlText = this.getControlText();
    return (
      <StyledButton
        type="button"
        aria-label={controlText}
        onClick={this.clickHandler}
      >
        <ControlIcon isMuted={isMuted} />
        <AssistiveText>{controlText}</AssistiveText>
      </StyledButton>
    );
  }

  private clickHandler = () => {
    const { dispatch, isMuted, videoElement } = this.props;

    if (isMuted) {
      dispatch(unmuteVideo(videoElement));
    } else {
      dispatch(muteVideo(videoElement));
    }
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
