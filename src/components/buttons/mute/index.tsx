import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { muteMedia, unmuteMedia } from '../../../actions/player';
import { IAianaState } from '../../../reducers';
import styled from '../../../utils/styled-components';
import AssistiveText from '../../a11y/AssistiveText';
import GhostButton from '../../shared/GhostButton';
import ControlIcon from './ControlIcon';
import { sliderShownMixin } from '../../volume-slider/Styles';

const StyledMuteButton = styled(GhostButton)`
  &:hover,
  &:focus:not([data-focus-visible-added]),
  &[data-focus-visible-added] {
    ~ .aip-volume {
      ${sliderShownMixin};
    }
  }
`;

interface IStateProps {
  isMuted: boolean;
  mediaSelector: string;
}

interface IDispatchProps {
  muteMedia(mediaSelector: string): void;
  unmuteMedia(mediaSelector: string): void;
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

  clickHandler = () => {
    if (this.props.isMuted) {
      this.props.unmuteMedia(this.props.mediaSelector);
    } else {
      this.props.muteMedia(this.props.mediaSelector);
    }
  };

  getControlText = () => {
    const { t, isMuted } = this.props;

    return isMuted ? t('controls.unmute') : t('controls.mute');
  };
}

function mapState(state: IAianaState) {
  return {
    isMuted: state.player.isMuted,
    mediaSelector: state.player.mediaSelector
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
