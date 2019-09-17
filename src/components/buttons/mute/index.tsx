import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { toggleMute } from '../../../actions/player';
import { IAianaState } from '../../../reducers';
import styled from '../../../utils/styled-components';
import AssistiveText from '../../a11y/AssistiveText';
import GhostButton from '../../shared/GhostButton';
import ControlIcon from './ControlIcon';
import { sliderShownMixin } from '../../volume-slider/Styles';
import MediaContext from '../../../contexts/MediaContext';

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
}

interface IDispatchProps {
  toggleMute(muted: boolean): void;
}

interface IMuteButton extends IStateProps, IDispatchProps {}

function MuteButton(props: IMuteButton) {
  const [t] = useTranslation();
  const [media] = useContext(MediaContext);

  const { isMuted, toggleMute } = props;

  return (
    <StyledMuteButton
      type="button"
      onClick={() => {
        media.muted = !isMuted;
        toggleMute(!isMuted);
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
    isMuted: state.player.isMuted
  };
}

const mapDispatch = {
  toggleMute
};

export default connect(
  mapState,
  mapDispatch
)(MuteButton);
