import * as React from 'react';
import { connect } from 'react-redux';
import { requestSeek } from '../../actions/player';
import { IAianaState } from '../../reducers/index';
import styled from '../../utils/styled-components';
import StyledButton from '../styled/StyledButton';

interface IStateProps {
  media?: HTMLMediaElement;
  startTime: number;
}

interface IDispatchProps {
  requestSeek: any;
}

interface IMediaChapterButton extends IStateProps, IDispatchProps {}

const StyledChapterButton = styled(StyledButton)`
  display: block;
  width: 100%;
`;

class MediaChapterButton extends React.Component<IMediaChapterButton> {
  render() {
    return (
      <StyledChapterButton type="button" onClick={this.clickHandler}>
        {this.props.children}
      </StyledChapterButton>
    );
  }

  private clickHandler = () => {
    if (this.props.media) {
      this.props.requestSeek(this.props.media, this.props.startTime);
    }
  };
}

function mapStateToProps(state: IAianaState) {
  return {
    media: state.player.mediaElement
  };
}

const mapDispatchToProps = {
  requestSeek
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaChapterButton);
