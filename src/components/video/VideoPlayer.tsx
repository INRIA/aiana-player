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
  updateTracksList,
  updateVideoDuration,
  videoElementMounted,
  videoElementUnounted
} from '../../actions/player';
import { IAianaState } from '../../reducers/index';
import { IConnectedReduxProps } from '../../store/index';
import {
  IRawTextTrack,
  isChapterTrack,
  isDisplayableTrack,
  rawTextTrack
} from '../../utils/media-tracks';
import styled from '../../utils/styled-components';
import MediaChapterTrack from './MediaChapterTrack';
import VideoTextTrack, { ITrack } from './VideoTextTrack';

export interface ISource {
  type?: string;
  src: string;
}

const StyledVideo = styled.video`
  display: block;
  width: 100%;
  max-height: 100%;
  max-width: 100%;
`;

export interface IVideoProps extends IConnectedReduxProps {
  autoPlay: boolean;
  currentTime: number;
  isMuted: boolean;
  isSeeking: boolean;
  language: string;
  nativeControls: boolean;
  preload: string;
  sources: ISource[];
  subtitlesTracks?: ITrack[];
  textTracks: IRawTextTrack[];
  volume: number;
}

class VideoPlayer extends React.PureComponent<IVideoProps> {
  private videoRef = React.createRef<HTMLVideoElement>();

  public componentDidMount() {
    const { dispatch, volume, isMuted } = this.props;
    const video = this.videoRef.current;

    if (!video) {
      return;
    }

    dispatch(videoElementMounted(video));

    video.volume = volume;
    video.muted = isMuted;

    this.populateTextTracks();
  }

  public componentWillUnmount() {
    this.props.dispatch(videoElementUnounted());
  }

  public render() {
    const {
      autoPlay,
      nativeControls,
      preload,
      sources,
      subtitlesTracks
    } = this.props;

    return (
      <StyledVideo
        innerRef={this.videoRef}
        className="aip-video"
        autoPlay={autoPlay}
        controls={nativeControls}
        tabIndex={nativeControls ? 0 : -1}
        preload={preload}
        onClick={this.clickHandler}
        onLoadedMetadata={this.loadedMetadataHandler}
        onPause={this.pauseHandler}
        onPlay={this.playHandler}
        onSeeked={this.seekedHandler}
        onSeeking={this.seekingHandler}
        onTimeUpdate={this.timeUpdateHandler}
        onVolumeChange={this.volumeChangeHandler}
      >
        {sources &&
          sources.map((source, index) => <source key={index} {...source} />)}

        {subtitlesTracks &&
          subtitlesTracks
            .filter(isDisplayableTrack)
            .map((track, index) => <VideoTextTrack key={index} {...track} />)}

        {subtitlesTracks &&
          subtitlesTracks
            .filter(isChapterTrack)
            .map((track, index) => (
              <MediaChapterTrack key={index} {...track} />
            ))}
      </StyledVideo>
    );
  }

  /**
   * Handles any changes made to the text tracks (selected, etc).
   */
  private populateTextTracks = () => {
    const { dispatch, subtitlesTracks } = this.props;

    if (!this.videoRef.current || !subtitlesTracks) {
      return;
    }

    const videoTracks = [
      ...this.videoRef.current.textTracks[Symbol.iterator]()
    ];
    const defaultTrack = subtitlesTracks.find(
      (track) => track.isDefault === true
    );

    const visibleTracks = videoTracks
      .filter(isDisplayableTrack)
      .map((track) => {
        return {
          ...rawTextTrack(track),
          active: track.label === (defaultTrack ? defaultTrack.label : false)
        };
      });

    if (visibleTracks.length) {
      dispatch(updateTracksList(visibleTracks));
    }
  };

  private clickHandler = () => {
    const video = this.videoRef.current!;
    video.paused ? video.play() : video.pause();
  };

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

  private timeUpdateHandler = () => {
    const video = this.videoRef.current!;
    this.props.dispatch(updateCurrentTime(video.currentTime));
  };

  private loadedMetadataHandler = () => {
    const video = this.videoRef.current!;
    this.props.dispatch(updateVideoDuration(video.duration));
  };

  /**
   * `volumechange` covers both volume level and mute toggle. A couple of checks
   * need to be performed to catch changes and dispatch them to update the
   * application state.
   */
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
  language: state.preferences.language,
  nativeControls: state.player.nativeControls,
  preload: state.player.preload,
  sources: state.player.sources,
  subtitlesTracks: state.player.subtitlesTracks,
  textTracks: state.player.textTracks,
  volume: state.player.volume
}))(VideoPlayer);
