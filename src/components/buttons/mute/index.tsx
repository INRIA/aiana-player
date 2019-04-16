import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { muteMedia, unmuteMedia } from '../../../actions/player';
import { IAianaState } from '../../../reducers/index';
import styled from '../../../utils/styled-components';
import AssistiveText from '../../a11y/AssistiveText';
import StyledButton from '../../shared/styled-button';
import ControlIcon from './ControlIcon';

const StyledMuteButton = styled(StyledButton)`
  &:hover ~ .aip-volume {
    width: 4em;
  }
`;

interface IStateProps {
  isMuted: boolean;
  mediaElement?: HTMLMediaElement;
}

interface IDispatchProps {
  muteMedia(media: HTMLMediaElement): void;
  unmuteMedia(media: HTMLMediaElement): void;
}

interface IMuteButton extends IStateProps, IDispatchProps, WithTranslation {}

class MuteButton extends React.Component<IMuteButton> {
  render() {
    return (
      <StyledMuteButton type="button" onClick={this.clickHandler}>
        <ControlIcon isMuted={this.props.isMuted} />
        <AssistiveText>{this.getControlText()}</AssistiveText>
      </StyledMuteButton>
    );
  }

  private clickHandler = () => {
    if (!this.props.mediaElement) {
      return;
    }

    if (this.props.isMuted) {
      this.props.unmuteMedia(this.props.mediaElement);
    } else {
      this.props.muteMedia(this.props.mediaElement);
    }
  };

  private getControlText = () => {
    const { t, isMuted } = this.props;

    return isMuted ? t('controls.unmute') : t('controls.mute');
  };
}

function mapState(state: IAianaState) {
  return {
    isMuted: state.player.isMuted,
    mediaElement: state.player.mediaElement
  };
}

const mapDispatch = {
  muteMedia,
  unmuteMedia
};

export default connect(
  mapState,
  mapDispatch
)(withTranslation()(MuteButton));
