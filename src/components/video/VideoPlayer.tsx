import * as React from 'react';
import styled from '../../utils/styled-components';

interface ISource {
  type?: string;
  src: string;
}

interface IVideoProps {
  sources?: ISource[];
  controls?: boolean;
  autoPlay?: boolean;
}

const StyledVideo = styled.video`
  width: 100%;
  max-width: 100%;
  max-height: 100%;
`;

class VideoPlayer extends React.Component<IVideoProps> {
  public static defaultProps: IVideoProps = {
    autoPlay: false,
    controls: false
  };

  public render() {
    const { sources, controls, autoPlay } = this.props;

    return (
      <StyledVideo autoPlay={autoPlay} controls={controls}>
        {sources &&
          sources.map(({ src, type }: ISource, index) => (
            <source key={index} src={src} type={type} />
          ))}
      </StyledVideo>
    );
  }
}

export default VideoPlayer;
