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

    console.log(sources);

    return (
      <video className="aiana-video-player" width="100%">
        {sources &&
          sources.map(({ src, type }: ISource, index) => (
            <source key={index} src={src} type={type} />
          ))}
      </video>
    );
  }
}

export default VideoPlayer;
