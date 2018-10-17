import * as React from 'react';
import { connect } from 'react-redux';
import { requestMediaPause, requestMediaPlay } from '../../actions/player';
import { IAianaState } from '../../reducers/index';
import { CDispatch, IConnectedReduxProps } from '../../store';
import styled from '../../utils/styled-components';
import StyledButton from '../styled/StyledButton';
import { IPlayButtonProps, PlayControlIcon } from './PlayButton';

const StyledFatPlayButton = styled(StyledButton)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;

  cursor: pointer;
  pointer-events: none;

  &[data-focus-visible-added] {
    box-shadow: none;
  }
`;

interface IFatPlayButtonProps extends IPlayButtonProps, IConnectedReduxProps {
  playMedia(media: HTMLMediaElement): void;
  pauseMedia(media: HTMLMediaElement): void;
}

class FatPlayButton extends React.Component<IFatPlayButtonProps> {
  public render() {
    return (
      <StyledFatPlayButton
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        onClick={this.togglePlay}
      >
        <PlayControlIcon isPlaying={this.props.isPlaying} />
      </StyledFatPlayButton>
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
}

const mapStateToProps = (state: IAianaState) => ({
  isPlaying: state.player.isPlaying,
  mediaElement: state.player.mediaElement
});

const mapDispatchToProps = (dispatch: CDispatch) => ({
  pauseMedia: (media: HTMLMediaElement) => {
    dispatch(requestMediaPause(media));
  },
  playMedia: (media: HTMLMediaElement) => {
    dispatch(requestMediaPlay(media));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FatPlayButton);
