import React from 'react';
import { I18nContextValues, withI18n } from 'react-i18next';
import { connect } from 'react-redux';
import { requestMediaPause, requestMediaPlay } from '../../../actions/player';
import AssistiveText from '../../../components/a11y/AssistiveText';
import StyledButton from '../../../components/styled/StyledButton';
import { IAianaState } from '../../../reducers/index';
import styled from '../../../utils/styled-components';
import PlayControlIcon from './ControlIcon';

const StyledPlayButton = styled(StyledButton)`
  width: 3em;
`;

export interface IPlayButtonProps {
  isPlaying: boolean;
  mediaElement?: HTMLMediaElement;
}

interface IDispatchProps {
  requestMediaPause: any;
  requestMediaPlay: any;
}

interface IProps extends IPlayButtonProps, IDispatchProps, I18nContextValues {}

class PlayButton extends React.Component<IProps> {
  render() {
    const controlText = this.getControlText();

    return (
      <StyledPlayButton
        type="button"
        aria-label={controlText}
        onClick={this.clickHandler}
      >
        <PlayControlIcon isPlaying={this.props.isPlaying} />
        <AssistiveText>{controlText}</AssistiveText>
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

  private getControlText = (): string => {
    const { t, isPlaying } = this.props;

    return isPlaying ? t('controls.pause') : t('controls.play');
  };
}

function mapStateToProps(state: IAianaState) {
  return {
    isPlaying: state.player.isPlaying,
    mediaElement: state.player.mediaElement
  };
}

const mapDispatchToProps = {
  requestMediaPause,
  requestMediaPlay
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withI18n()(PlayButton));
