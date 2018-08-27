import * as React from 'react';

import VideoPlayer from './video/VideoPlayer';
import VideoControls from './video/VideoControls';

import {
  DEFAULT_MEDIA_TYPE,
  DEFAULT_NATIVE_CONTROLS,
  MEDIA_TYPE_VIDEO
} from '../constants';

interface IProps {
  mediaSources?: any[];
  nativeControls?: boolean;
  mediaType?: string;
  locale?: string;
}

class Player extends React.Component<IProps> {
  public static defaultProps: IProps = {
    mediaType: DEFAULT_MEDIA_TYPE,
    nativeControls: DEFAULT_NATIVE_CONTROLS
  };

  public render() {
    const { locale, mediaSources, mediaType, nativeControls } = this.props;

    return (
      <div className="aiana-player" lang={locale}>
        {mediaType === MEDIA_TYPE_VIDEO && (
          <div className="aiana-media">
            <VideoPlayer controls={nativeControls} sources={mediaSources} />
            <VideoControls />
          </div>
        )}
      </div>
    );
  }
}

export default Player;
