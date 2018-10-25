import * as React from 'react';
import { connect } from 'react-redux';
import { requestSeek } from 'src/actions/player';
import { IAianaState } from 'src/reducers/index';
import styled from 'src/utils/styled-components';

interface IProps {
  startTime: number;
  media: HTMLMediaElement | null;
}

interface IDispatchProps {
  requestSeek(media: HTMLMediaElement, seekingTime: number): void;
}

interface IMediaChapterButton extends IProps, IDispatchProps {}

const StyledButton = styled.button`
  display: block;
  border: 0;
  background-color: transparent;
  text-decoration: underline;
  font-size: 100%;
  font-family: inherit;
  cursor: pointer;
`;

class MediaChapterButton extends React.Component<IMediaChapterButton> {
  public render() {
    return (
      <StyledButton type="button" onClick={this.clickHandler}>
        {this.props.children}
      </StyledButton>
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
