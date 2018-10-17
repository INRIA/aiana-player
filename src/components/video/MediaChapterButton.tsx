import * as React from 'react';
import { connect } from 'react-redux';
import { requestSeek } from '../../actions/player';
import { IAianaState } from '../../reducers/index';
import { IConnectedReduxProps } from '../../store';
import styled from '../../utils/styled-components';

interface IMediaChapterButton extends IConnectedReduxProps {
  startTime: number;
  video: HTMLMediaElement | null;
}

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
    const { dispatch, startTime, video } = this.props;
    if (!video) {
      return;
    }
    dispatch(requestSeek(video, startTime));
  };
}

export default connect((state: IAianaState) => ({
  video: state.player.mediaElement
}))(MediaChapterButton);
