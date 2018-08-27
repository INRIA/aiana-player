import * as React from 'react';
import MediaPlayButton from '../buttons/MediaPlayButton';

class VideoControls extends React.Component {
  public render() {
    return (
      <div className="aiana-video-controls">
        <MediaPlayButton />
      </div>
    );
  }
}

export default VideoControls;
