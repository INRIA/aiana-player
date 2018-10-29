import * as React from 'react';
import { connect } from 'react-redux';
import { requestSeek } from 'src/actions/player';
import { IAianaState } from 'src/reducers/index';
import styled from 'src/utils/styled-components';
import StyledButton from '../styled/StyledButton';

interface IProps {
  startTime: number;
  media: HTMLMediaElement | null;
}

interface IDispatchProps {
  requestSeek(media: HTMLMediaElement, seekingTime: number): void;
}

interface IMediaChapterButton extends IProps, IDispatchProps {}

const StyledChapterButton = styled(StyledButton)`
  display: block;
  width: 100%;
`;

class MediaChapterButton extends React.Component<IMediaChapterButton> {
  public render() {
    return (
      <StyledChapterButton type="button" onClick={this.clickHandler}>
        {this.props.children}
      </StyledChapterButton>
    );
  }

  private clickHandler = () => {
    const { requestSeek: requestSeekAction, startTime, media } = this.props;
    if (!media) {
      return;
    }
    requestSeekAction(media, startTime);
  };
}

const mapStateToProps = (state: IAianaState) => ({
  media: state.player.mediaElement
});

const mapDispatchToProps = {
  requestSeek
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaChapterButton);
