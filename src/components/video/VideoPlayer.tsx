import * as React from 'react';
import { connect } from 'react-redux';
import {
  videoElementMounted,
  videoElementUnounted
} from '../../actions/player';
import { IConnectedReduxProps } from '../../store/index';
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

class VideoPlayer extends React.Component<IVideoProps & IConnectedReduxProps> {
  public static defaultProps: IVideoProps = {
    autoPlay: false,
    controls: false
  };

  private videoRef = React.createRef<HTMLVideoElement>();

  public componentDidMount() {
    const { dispatch } = this.props;

    if (this.videoRef.current) {
      dispatch(videoElementMounted(this.videoRef.current));
    }
  }

  public componentWillUnmount() {
    const { dispatch } = this.props;

    dispatch(videoElementUnounted());
  }

  public render() {
    const { sources, controls, autoPlay } = this.props;

    return (
      <StyledVideo
        innerRef={this.videoRef}
        autoPlay={autoPlay}
        controls={controls}
      >
        {sources &&
          sources.map(({ src, type }: ISource, index) => (
            <source key={index} src={src} type={type} />
          ))}
      </StyledVideo>
    );
  }
}

export default connect()(VideoPlayer);
