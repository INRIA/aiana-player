import * as React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { requestVideoPause, requestVideoPlay } from '../../actions/player';
import { IAianaState } from '../../reducers/index';
import styled from '../../utils/styled-components';
import { ITransnected } from '../../utils/types';
import AssistiveText from '../a11y/AssistiveText';
import StyledButton from '../styled/StyledButton';
import StyledSvg from '../styled/StyledSvg';
import PauseIcon from '../svg/Pause';
import PlayIcon from '../svg/PlayArrow';

const StyledPlayIcon = StyledSvg.withComponent(PlayIcon);
const StyledPauseIcon = StyledSvg.withComponent(PauseIcon);

interface IControlIcon {
  isPlaying: boolean;
}

const ControlIcon: React.SFC<IControlIcon> = ({ isPlaying }) => {
  if (isPlaying) {
    return <StyledPauseIcon aria-hidden={true} />;
  }

  return <StyledPlayIcon aria-hidden={true} />;
};

const StyledPlayButton = styled(StyledButton)`
  width: 3em;
`;

interface IProps extends ITransnected {
  isPlaying: boolean;
  videoElement: HTMLVideoElement | null;
}

class PlayButton extends React.Component<IProps> {
  public render() {
    const controlText = this.getControlText();

    return (
      <StyledPlayButton
        type="button"
        aria-label={controlText}
        onClick={this.togglePlay}
      >
        <ControlIcon isPlaying={this.props.isPlaying} />
        <AssistiveText>{controlText}</AssistiveText>
      </StyledPlayButton>
    );
  }

  private togglePlay = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();

    const { isPlaying, videoElement, dispatch } = this.props;

    if (isPlaying && videoElement) {
      dispatch(requestVideoPause(videoElement));
    } else if (!isPlaying && videoElement) {
      dispatch(requestVideoPlay(videoElement));
    }
  };

  private getControlText = (): string => {
    const { t, isPlaying } = this.props;

    return isPlaying ? t('controls.pause') : t('controls.play');
  };
}

export default connect((state: IAianaState) => ({
  isPlaying: state.player.isPlaying,
  videoElement: state.player.videoElement
}))(translate()(PlayButton));
