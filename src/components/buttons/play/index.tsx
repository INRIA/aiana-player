import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { requestMediaPause, requestMediaPlay } from '../../../actions/player';
import { IAianaState } from '../../../reducers/index';
import styled from '../../../utils/styled-components';
import AssistiveText from '../../a11y/AssistiveText';
import StyledButton from '../../shared/styled-button';
import PlayControlIcon from './ControlIcon';

export interface IPlayButtonProps {
  isPlaying: boolean;
  mediaElement?: HTMLMediaElement;
}

interface IDispatchProps {
  requestMediaPause: any;
  requestMediaPlay: any;
}

interface IProps extends IPlayButtonProps, IDispatchProps, WithTranslation {}

const StyledPlayButton = styled(StyledButton)`
  width: 3em;
`;

class PlayButton extends React.Component<IProps> {
  render() {
    return (
      <StyledPlayButton onClick={this.clickHandler} type="button">
        <PlayControlIcon isPlaying={this.props.isPlaying} />
        <AssistiveText>{this.getControlText()}</AssistiveText>
      </StyledPlayButton>
    );
  }

  private clickHandler = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();

    if (this.props.isPlaying && this.props.mediaElement) {
      this.props.requestMediaPause(this.props.mediaElement);
    } else if (!this.props.isPlaying && this.props.mediaElement) {
      this.props.requestMediaPlay(this.props.mediaElement);
    }
  };

  private getControlText = () => {
    const { t, isPlaying } = this.props;

    return isPlaying ? t('controls.pause') : t('controls.play');
  };
}

function mapState(state: IAianaState) {
  return {
    isPlaying: state.player.isPlaying,
    mediaElement: state.player.mediaElement
  };
}

const mapDispatch = {
  requestMediaPause,
  requestMediaPlay
};

export default connect(
  mapState,
  mapDispatch
)(withTranslation()(PlayButton));
