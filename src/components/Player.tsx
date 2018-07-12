import * as React from 'react';

import UnsupportedMediaTypeMessage from './UnsupportedMediaTypeMessage';
import Controls from './video/Controls';

import {
  DEFAULT_MEDIA_TYPE,
  DEFAULT_NATIVE_CONTROLS,
  MEDIA_TYPE_VIDEO
} from '../constants';

interface IMediaSource {
  url: string;
  type?: string;
}

interface IProps {
  mediaSources?: IMediaSource[];
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
        {mediaType === MEDIA_TYPE_VIDEO ? (
          <div className="aiana-media">
            <video controls={nativeControls}>
              {mediaSources!.map(({ url, type }) => (
                <source src={url} type={type} key={url} />
              ))}
            </video>

            <Controls />
          </div>
        ) : (
          <UnsupportedMediaTypeMessage mediaType={mediaType} />
        )}
      </div>
    );
  }
}

export default Player;
