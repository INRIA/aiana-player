import * as React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { muteVideo, unmuteVideo } from '../../actions/player';
import { IAianaState } from '../../reducers/index';
import styled from '../../utils/styled-components';
import { ITransnected } from '../../utils/types';
import AssistiveText from '../a11y/AssistiveText';
import StyledButton from '../styled/StyledButton';
import StyledSvg from '../styled/StyledSvg';
import VolumeUnmutedIcon from '../svg/VolumeFull';
import VolumeMutedIcon from '../svg/VolumeMuted';

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

const StyledMuteButton = styled(StyledButton)`
  &:hover,
  &.focus-visible {
    & ~ .aip-volume {
      width: 4em;
    }
  }
`;

interface IProps extends ITransnected {
  isMuted: boolean;
  videoElement: HTMLVideoElement | null;
}

class MuteButton extends React.Component<IProps> {
  public render() {
    const controlText = this.getControlText();

    return (
      <StyledMuteButton
        type="button"
        aria-label={controlText}
        onClick={this.clickHandler}
      >
        <ControlIcon isMuted={this.props.isMuted} />
        <AssistiveText>{controlText}</AssistiveText>
      </StyledMuteButton>
    );
  }

  private clickHandler = () => {
    const { dispatch, isMuted, videoElement } = this.props;

    if (!videoElement) {
      return;
    }

    if (isMuted) {
      dispatch(unmuteVideo(videoElement));
    } else {
      dispatch(muteVideo(videoElement));
    }
  };

  private getControlText = () => {
    const { t, isMuted } = this.props;

    return isMuted ? t('controls.unmute') : t('controls.mute');
  };
}

export default connect((state: IAianaState) => ({
  isMuted: state.player.isMuted,
  videoElement: state.player.videoElement
}))(translate()(MuteButton));
