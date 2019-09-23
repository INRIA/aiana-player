import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { pauseMedia, playMedia } from '../../../actions/player';
import { IAianaState } from '../../../reducers';
import styled from '../../../utils/styled-components';
import AssistiveText from '../../a11y/AssistiveText';
import GhostButton from '../../shared/GhostButton';
import PlayButtonIcon from './PlayButtonIcon';
import MediaContext from '../../../contexts/MediaContext';

export interface IPlayButtonProps {
  isPlaying: boolean;
}

interface IDispatchProps {
  pauseMedia(): void;
  playMedia(): void;
}

interface IProps extends IPlayButtonProps, IDispatchProps {}

const StyledPlayButton = styled(GhostButton)`
  padding: 0 6px;
  width: calc(2.25em + 2 * 6px);
`;

function PlayButton(props: IProps) {
  const [media] = useContext(MediaContext);
  const [t] = useTranslation();

  return (
    <StyledPlayButton
      onClick={(evt) => {
        evt.preventDefault();

        if (props.isPlaying) {
          media.pause();
          props.pauseMedia();
        } else if (!props.isPlaying) {
          media.play();
          props.playMedia();
        }
      }}
    >
      <PlayButtonIcon isPlaying={props.isPlaying} />
      <AssistiveText>
        {props.isPlaying ? t('controls.pause') : t('controls.play')}
      </AssistiveText>
    </StyledPlayButton>
  );
}

function mapState(state: IAianaState) {
  return {
    isPlaying: state.player.isPlaying
  };
}

const mapDispatch = {
  pauseMedia,
  playMedia
};

export default connect(
  mapState,
  mapDispatch
)(PlayButton);
