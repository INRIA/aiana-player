import React from 'react';
import { connect } from 'react-redux';
import { requestSeek } from '../../actions/player';
import { IAianaState } from '../../reducers';
import styled from '../../utils/styled-components';
import StyledButton from '../shared/styled-button';

interface IProps {
  isActive: boolean;
  startTime: number;
}

interface IStateProps {
  media?: HTMLMediaElement;
}

interface IDispatchProps {
  requestSeek: any;
}

interface IMediaChapterButton extends IProps, IStateProps, IDispatchProps {}

const StyledChapterButton = styled(StyledButton)`
  width: auto;
`;

class MediaChapterButton extends React.Component<IMediaChapterButton> {
  render() {
    return (
      <StyledChapterButton
        aria-pressed={this.props.isActive}
        onClick={this.clickHandler}
        type="button"
      >
        {this.props.children}
      </StyledChapterButton>
    );
  }

  clickHandler = () => {
    if (this.props.media) {
      this.props.requestSeek(this.props.media, this.props.startTime);
    }
  };
}

function mapState(state: IAianaState) {
  return {
    media: state.player.mediaElement
  };
}

const mapDispatch = {
  requestSeek
};

export default connect(
  mapState,
  mapDispatch
)(MediaChapterButton);
