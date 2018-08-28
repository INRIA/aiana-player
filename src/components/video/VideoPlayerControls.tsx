import * as React from 'react';
import MediaPlayButton from '../buttons/MediaPlayButton';

export default class VideoPlayerControls extends React.Component {
  public render() {
    return (
      <div className="aiana-video-controls">
        <MediaPlayButton />
      </div>
    );
  }
}
