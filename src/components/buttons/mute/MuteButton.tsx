import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { muteMedia, unmuteMedia } from 'src/actions/player';
import AssistiveText from 'src/components/a11y/AssistiveText';
import StyledButton from 'src/components/styled/StyledButton';
import { IAianaState } from 'src/reducers/index';
import styled from 'src/utils/styled-components';
import ControlIcon from './ControlIcon';

const StyledMuteButton = styled(StyledButton)`
  &:hover ~ .aip-volume {
    width: 4em;
  }
`;

interface IProps {
  isMuted: boolean;
  mediaElement?: HTMLMediaElement;
}

interface IDispatchProps {
  mute(media: HTMLMediaElement): void;
  unmute(media: HTMLMediaElement): void;
}

interface IMuteButton extends IProps, IDispatchProps, InjectedTranslateProps {}

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
)(translate()(MuteButton));
