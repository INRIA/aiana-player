import * as React from 'react';
import MediaPlayButton from '../buttons/MediaPlayButton';

export default class VideoPlayerControls extends React.Component {
  render() {
    return (
      <div className="aiana-video-controls">
        <MediaPlayButton />
      </div>
    );
  }
}
