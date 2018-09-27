import * as React from 'react';
import { connect } from 'react-redux';
import {
  changeVolume,
  pauseVideo,
  playVideo,
  startSeeking,
  stopSeeking,
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
import VideoTrack, { ITrack } from './VideoTrack';

export interface ISource {
  type?: string;
  src: string;
}

const StyledVideo = styled.video`
  width: 100%;
  max-width: 100%;
  max-height: 100%;
`;

export interface IVideoProps extends IConnectedReduxProps {
  autoPlay: boolean;
  currentTime: number;
  isMuted: boolean;
  isSeeking: boolean;
  nativeControls: boolean;
  preload: string;
  sources: ISource[];
  tracks?: ITrack[];
  volume: number;
}

class VideoPlayer extends React.PureComponent<IVideoProps> {
  private get video() {
    return this.videoRef.current!;
  }

  private videoRef = React.createRef<HTMLVideoElement>();

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
    const { autoPlay, nativeControls, preload, sources, tracks } = this.props;

    return (
      <StyledVideo
        innerRef={this.videoRef}
        className="aip-video"
        autoPlay={autoPlay}
        controls={nativeControls}
        preload={preload}
        onLoadedMetadata={this.loadedMetadataHandler}
        onPause={this.pauseHandler}
        onPlay={this.playHandler}
        onTimeUpdate={this.timeUpdateHandler}
        onVolumeChange={this.volumeChangeHandler}
        onSeeked={this.seekedHandler}
        onSeeking={this.seekingHandler}
      >
        {sources &&
          sources.map((source: ISource, index) => (
            <source key={index} {...source} />
          ))}

        {tracks &&
          tracks.map((track: ITrack, index) => (
            <VideoTrack key={index} {...track} />
          ))}
      </StyledVideo>
    );
  }

  private seekedHandler = () => {
    const { dispatch, isSeeking } = this.props;
    if (isSeeking) {
      dispatch(stopSeeking());
    }
  };

  private seekingHandler = () => {
    const { dispatch, isSeeking } = this.props;
    if (!isSeeking) {
      dispatch(startSeeking());
    }
  };

  /**
   * @todo
   */
  private timeUpdateHandler = () => {
    const currentPercentage = unitToPercent(
      this.video.currentTime,
      this.video.duration
    );
    console.log(currentPercentage);

    this.props.dispatch(updateCurrentTime(this.video.currentTime));
  };

  private loadedMetadataHandler = () => {
    this.props.dispatch(updateVideoDuration(this.video.duration));
  };

  private volumeChangeHandler = () => {
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
  isSeeking: state.player.isSeeking,
  nativeControls: state.player.nativeControls,
  preload: state.player.preload,
  sources: state.player.sources,
  tracks: state.player.tracks,
  volume: state.player.volume
}))(VideoPlayer);
