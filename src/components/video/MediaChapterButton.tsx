import * as React from 'react';
import { connect } from 'react-redux';
import { requestSeek } from '../../actions/player';
import { IAianaState } from '../../reducers/index';
import { IConnectedReduxProps } from '../../store/index';

interface IMediaChapterButton extends IConnectedReduxProps {
  startTime: number;
  video: HTMLVideoElement | null;
}

class MediaChapterButton extends React.Component<IMediaChapterButton> {
  public render() {
    return (
      <button type="button" onClick={this.clickHandler}>
        {this.props.children}
      </button>
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
  video: state.player.videoElement
}))(MediaChapterButton);
