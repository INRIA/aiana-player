import * as React from 'react';
import { connect } from 'react-redux';
import {
  changeVolume,
  pauseVideo,
  playVideo,
  toggleMute,
  updateCurrentTime,
  updateVideoDuration,
  videoElementMounted,
  videoElementUnounted
} from '../../actions/player';
import { IAianaState } from '../../reducers/index';
import { IConnectedReduxProps } from '../../store/index';
import { unitToPercent } from '../../utils/math';
import styled from '../../utils/styled-components';

export interface ISource {
  type?: string;
  src: string;
}

interface IVideoProps {
  autoPlay: boolean;
  currentTime: number;
  isMuted: boolean;
  nativeControls: boolean;
  preload: string;
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

  private get video() {
    return this.videoRef.current!;
  }

  public componentDidMount() {
    const { dispatch, volume, isMuted } = this.props;
    const { video } = this;

    video.volume = volume;
    video.muted = isMuted;

    dispatch(videoElementMounted(video));
  }

  public componentWillUnmount() {
    this.props.dispatch(videoElementUnounted());
  }

  public render() {
    const { autoPlay, nativeControls, preload, sources } = this.props;

    return (
      <StyledVideo
        innerRef={this.videoRef}
        className="aip-video"
        autoPlay={autoPlay}
        controls={nativeControls}
        preload={preload}
        onLoadedMetadata={this.loadedmetadataHandler}
        onPause={this.pauseHandler}
        onPlay={this.playHandler}
        onTimeUpdate={this.timeupdateHandler}
        onVolumeChange={this.volumechangeHandler}
      >
        {sources &&
          sources.map(({ src, type }: ISource, index) => (
            <source key={index} src={src} type={type} />
          ))}
      </StyledVideo>
    );
  }

  /**
   * @todo
   */
  private timeupdateHandler = () => {
    const { dispatch } = this.props;
    const currentPercentage = unitToPercent(
      this.video.currentTime,
      this.video.duration
    );
    console.log(currentPercentage);

    dispatch(updateCurrentTime(this.video.currentTime));
  };

  private loadedmetadataHandler = () => {
    const { dispatch } = this.props;

    dispatch(updateVideoDuration(this.video.duration));
  };

  private volumechangeHandler = () => {
    const video = this.videoRef.current!;
    const { dispatch, isMuted, volume } = this.props;

    // only dispatch `toggleMute` when state is behind video object property
    if ((!isMuted && video.muted) || (isMuted && !video.muted)) {
      dispatch(toggleMute(video.muted));
    }

    if (video.volume !== volume) {
      dispatch(changeVolume(video.volume));
    }
  };

  private playHandler = () => {
    this.props.dispatch(playVideo());
  };

  private pauseHandler = () => {
    this.props.dispatch(pauseVideo());
  };
}

export default connect((state: IAianaState) => ({
  autoPlay: state.player.autoPlay,
  currentTime: state.player.currentTime,
  isMuted: state.player.isMuted,
  nativeControls: state.player.nativeControls,
  preload: state.player.preload,
  sources: state.player.sources,
  volume: state.player.volume
}))(VideoPlayer);
