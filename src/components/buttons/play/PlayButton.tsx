import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { requestMediaPause, requestMediaPlay } from '../../../actions/player';
import { IAianaState } from '../../../reducers/index';
import styled from '../../../utils/styled-components';
import AssistiveText from '../../a11y/AssistiveText';
import StyledButton from '../../styled/StyledButton';
import PlayControlIcon from './ControlIcon';

const StyledPlayButton = styled(StyledButton)`
  width: 3em;
`;

export interface IPlayButtonProps {
  isPlaying: boolean;
  mediaElement: HTMLMediaElement | null;
}

interface IDispatchProps {
  pauseMedia: (media: HTMLMediaElement) => void;
  playMedia: (media: HTMLMediaElement) => void;
}

interface IProps
  extends IPlayButtonProps,
    IDispatchProps,
    InjectedTranslateProps {}

class PlayButton extends React.Component<IProps> {
  public render() {
    const controlText = this.getControlText();

    return (
      <StyledPlayButton
        type="button"
        aria-label={controlText}
        onClick={this.togglePlay}
      >
        <PlayControlIcon isPlaying={this.props.isPlaying} />
        <AssistiveText>{controlText}</AssistiveText>
      </StyledPlayButton>
    );
  }

  private togglePlay = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();

    const { isPlaying, mediaElement, pauseMedia, playMedia } = this.props;

    if (isPlaying && mediaElement) {
      pauseMedia(mediaElement);
    } else if (!isPlaying && mediaElement) {
      playMedia(mediaElement);
    }
  };

  private getControlText = (): string => {
    const { t, isPlaying } = this.props;

    return isPlaying ? t('controls.pause') : t('controls.play');
  };
}

const mapStateToProps = (state: IAianaState) => ({
  isPlaying: state.player.isPlaying,
  mediaElement: state.player.mediaElement
});

const mapDispatchToProps = {
  pauseMedia: requestMediaPause,
  playMedia: requestMediaPlay
};

export default connect<IPlayButtonProps, IDispatchProps, void>(
  mapStateToProps,
  mapDispatchToProps
)(translate()(PlayButton));
