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

    this.addListeners();
  }

  public componentWillUnmount() {
    this.removeListeners();
    this.props.dispatch(videoElementUnounted());
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

  private addListeners = () => {
    const { video } = this;

    video.addEventListener('playing', this.playingListener);
    video.addEventListener('pause', this.pauseListener);
    video.addEventListener('volumechange', this.volumechangeListener);
    video.addEventListener('loadedmetadata', this.loadedmetadataListener);
    video.addEventListener('timeupdate', this.timeupdateListener);
  };

  private removeListeners = () => {
    const { video } = this;

    video.removeEventListener('playing', this.playingListener);
    video.removeEventListener('pause', this.pauseListener);
    video.removeEventListener('volumechange', this.volumechangeListener);
    video.removeEventListener('loadedmetadata', this.loadedmetadataListener);
    video.removeEventListener('timeupdate', this.timeupdateListener);
  };

  /**
   * @todo
   */
  private timeupdateListener = () => {
    const { currentTime, dispatch } = this.props;
    const currentPercentage = unitToPercent(
      this.video.currentTime,
      this.video.duration
    );
    console.log(currentPercentage);

    if (this.shouldDispatchTimeUpdate(this.video.currentTime, currentTime)) {
      dispatch(updateCurrentTime(this.video.currentTime));
    }
  };

  /**
   * Defines the update time dispatch policy. It is mainly used to throttle
   * dispatch and avoid unnecessary access to the store.
   *
   * @param realTime The video current time.
   * @param storedTime Time in the application store.
   */
  private shouldDispatchTimeUpdate(
    realTime: number,
    storedTime: number
  ): boolean {
    const { round } = Math;

    return round(realTime) !== round(storedTime);
  }

  private loadedmetadataListener = () => {
    const { dispatch } = this.props;

    dispatch(updateVideoDuration(this.video.duration));
  };

  private volumechangeListener = () => {
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

  private playingListener = () => {
    this.props.dispatch(playVideo());
  };

  private pauseListener = () => {
    this.props.dispatch(pauseVideo());
  };
}

export default connect((state: IAianaState) => ({
  autoPlay: state.player.autoPlay,
  currentTime: state.player.currentTime,
  isMuted: state.player.isMuted,
  nativeControls: state.player.nativeControls,
  sources: state.player.sources,
  volume: state.player.volume
}))(VideoPlayer);
