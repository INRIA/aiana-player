import * as React from 'react';
import { connect } from 'react-redux';
import { requestVideoPause, requestVideoPlay } from '../../actions/player';
import { IAianaState } from '../../reducers/index';
import { IConnectedReduxProps } from '../../store/index';
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

interface IFatPlayButtonProps extends IPlayButtonProps, IConnectedReduxProps {}

class FatPlayButton extends React.Component<IFatPlayButtonProps> {
  public render() {
    return (
      <StyledFatPlayButton
        type="button"
        aria-hidden={true}
        tabIndex={-1}
        onClick={this.togglePlay}
      >
        <PlayControlIcon isPlaying={this.props.isPlaying} />
      </StyledFatPlayButton>
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
}

export default connect((state: IAianaState) => ({
  isPlaying: state.player.isPlaying,
  videoElement: state.player.videoElement
}))(FatPlayButton);
