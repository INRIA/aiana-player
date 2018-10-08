import * as React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers/index';
import { IConnectedReduxProps } from '../../store/index';

interface IVideoSubtitles extends IConnectedReduxProps {
  subtitleText: string | undefined;
}

class VideoSubtitles extends React.Component<IVideoSubtitles> {
  public render() {
    if (!this.props.subtitleText) {
      return null;
    }

    return <div>{this.props.subtitleText}</div>;
  }
}

export default connect((state: IAianaState) => ({
  subtitleText: state.player.subtitleText
}))(VideoSubtitles);
