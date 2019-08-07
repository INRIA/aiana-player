import React from 'react';
import { useTranslation } from 'react-i18next';
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

interface IMuteButton extends IStateProps, IDispatchProps {}

function MuteButton(props: IMuteButton) {
  const [t] = useTranslation();

  const { isMuted, unmuteMedia, muteMedia, mediaSelector } = props;

  return (
    <StyledMuteButton
      type="button"
      onClick={() => {
        isMuted ? unmuteMedia(mediaSelector) : muteMedia(mediaSelector);
      }}
    >
      <ControlIcon isMuted={isMuted} />
      <AssistiveText>
        {isMuted ? t('controls.unmute') : t('controls.mute')}
      </AssistiveText>
    </StyledMuteButton>
  );
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
)(MuteButton);
