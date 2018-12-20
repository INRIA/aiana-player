import * as React from 'react';
import { I18nContextValues, withI18n } from 'react-i18next';
import { connect } from 'react-redux';
import { muteMedia, unmuteMedia } from '../../../actions/player';
import AssistiveText from '../../../components/a11y/AssistiveText';
import StyledButton from '../../../components/styled/StyledButton';
import { IAianaState } from '../../../reducers/index';
import styled from '../../../utils/styled-components';
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

interface IMuteButton extends IStateProps, IDispatchProps, I18nContextValues {}

class MuteButton extends React.Component<IMuteButton> {
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

function mapStateToProps(state: IAianaState) {
  return {
    isMuted: state.player.isMuted,
    mediaElement: state.player.mediaElement
  };
}

const mapDispatchToProps = {
  muteMedia,
  unmuteMedia
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withI18n()(MuteButton));
