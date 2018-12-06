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
  mute(media: HTMLMediaElement): void;
  unmute(media: HTMLMediaElement): void;
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
    const { isMuted, mediaElement, mute, unmute } = this.props;

    if (!mediaElement) {
      return;
    }

    if (isMuted) {
      unmute(mediaElement);
    } else {
      mute(mediaElement);
    }
  };

  private getControlText = () => {
    const { t, isMuted } = this.props;

    return isMuted ? t('controls.unmute') : t('controls.mute');
  };
}

const mapStateToProps = (state: IAianaState) => ({
  isMuted: state.player.isMuted,
  mediaElement: state.player.mediaElement
});

const mapDispatchToProps = {
  mute: muteMedia,
  unmute: unmuteMedia
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withI18n()(MuteButton));
