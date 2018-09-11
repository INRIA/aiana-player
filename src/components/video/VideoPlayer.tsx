import * as React from 'react';
import { connect } from 'react-redux';
import {
  videoElementMounted,
  videoElementUnounted
} from '../../actions/player';
import { IAianaState } from '../../reducers/index';
import { IConnectedReduxProps } from '../../store/index';
import styled from '../../utils/styled-components';

export interface ISource {
  type?: string;
  src: string;
}

interface IVideoProps {
  autoPlay: boolean;
  isMuted: boolean;
  nativeControls: boolean;
  sources: ISource[];
  volume: number;
}

const StyledVideo = styled.video`
  width: 100%;
  max-width: 100%;
  max-height: 100%;
`;

class VideoPlayer extends React.PureComponent<
  IVideoProps & IConnectedReduxProps
> {
  private videoRef = React.createRef<HTMLVideoElement>();

  public componentDidMount() {
    const { dispatch, isMuted, volume } = this.props;
    const video = this.videoRef.current!;

    video.volume = volume;
    video.muted = isMuted;

    dispatch(videoElementMounted(this.videoRef.current!));
  }

  public componentWillUnmount() {
    const { dispatch } = this.props;

    dispatch(videoElementUnounted());
  }

  public render() {
    const { autoPlay, nativeControls, sources } = this.props;

    return (
      <StyledVideo
        innerRef={this.videoRef}
        className="aip-video"
        autoPlay={autoPlay}
        controls={nativeControls}
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
  isMuted: state.player.isMuted,
  nativeControls: state.player.nativeControls,
  sources: state.player.sources,
  volume: state.player.volume
}))(VideoPlayer);
