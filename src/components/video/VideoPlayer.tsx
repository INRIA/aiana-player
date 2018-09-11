import * as React from 'react';
import { connect } from 'react-redux';
import {
  videoElementMounted,
  videoElementUnounted
} from '../../actions/player';
import { IAianaState } from '../../reducers/index';
import { IConnectedReduxProps } from '../../store/index';
import styled from '../../utils/styled-components';

interface ISource {
  type?: string;
  src: string;
}

interface IVideoProps {
  sources?: ISource[];
  controls: boolean;
  autoPlay: boolean;
}

const StyledVideo = styled.video`
  width: 100%;
  max-width: 100%;
  max-height: 100%;
`;

class VideoPlayer extends React.Component<IVideoProps & IConnectedReduxProps> {
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
    const { autoPlay, controls, sources } = this.props;

    return (
      <StyledVideo
        innerRef={this.videoRef}
        className="aip-video"
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

export default connect((state: IAianaState) => ({
  autoPlay: state.player.autoPlay,
  controls: state.player.nativeControls
}))(VideoPlayer);
