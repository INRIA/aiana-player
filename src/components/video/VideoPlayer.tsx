import * as React from 'react';

interface ISource {
  type?: string;
  src: string;
}

interface IVideoProps {
  sources?: ISource[];
  controls?: boolean;
  autoPlay?: boolean;
}

class VideoPlayer extends React.Component<IVideoProps> {
  public static defaultProps: IVideoProps = {
    autoPlay: false,
    controls: false
  };

  render() {
    const { props } = this;
    const { sources } = props;

    return (
      <video className="aiana-video-player" width="100%" {...props}>
        {sources &&
          sources.map(({ src, type }: ISource) => (
            <source key={src} src={src} type={type} />
          ))}
      </video>
    );
  }
}

export default VideoPlayer;
