import * as React from 'react';
import { connect } from 'react-redux';
import {
  changeVolume,
  mediaElementMounted,
  mediaElementUnounted,
  pauseMedia,
  playMedia,
  startSeeking,
  stopSeeking,
  toggleMute,
  updateCurrentTime,
  updateMediaDuration,
  updateTracksList
} from '../../actions/player';
import { IAianaState } from '../../reducers/index';
import {
  IRawTextTrack,
  isChapterTrack,
  isDisplayableTrack,
  rawTextTrack
} from '../../utils/media-tracks';
import styled from '../../utils/styled-components';
import MediaChapterTrack from './MediaChapterTrack';
import VideoTextTrack, { ITrack } from './VideoTextTrack';

const StyledVideo = styled.video`
  display: block;
  width: 100%;
  max-height: 100%;
  max-width: 100%;
`;

export interface ISource {
  type?: string;
  src: string;
}

interface IDispatchProps {
  changeVolume: (volume: number) => void;
  mediaElementMounted: (media: HTMLMediaElement) => void;
  mediaElementUnounted: () => void;
  pauseHandler: () => void;
  playHandler: () => void;
  startSeeking: () => void;
  stopSeeking: () => void;
  toggleMute: (muted: boolean) => void;
  updateCurrentTime: (time: number) => void;
  updateMediaDuration: (duration: number) => void;
  updateTracksList: (textTracks: IRawTextTrack[]) => void;
}

interface IVideoProps {
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

interface IProps extends IVideoProps, IDispatchProps {}

class VideoPlayer extends React.Component<IProps> {
  private mediaRef = React.createRef<HTMLMediaElement>();

  public componentDidMount() {
    const { volume, isMuted } = this.props;
    const media = this.mediaRef.current;

    if (!media) {
      return;
    }

    this.props.mediaElementMounted(media);

    media.volume = volume;
    media.muted = isMuted;

    this.populateTextTracks();
  }

  public componentWillUnmount() {
    this.props.mediaElementUnounted();
  }

  public render() {
    const {
      autoPlay,
      nativeControls,
      pauseHandler,
      playHandler,
      preload,
      sources,
      subtitlesTracks
    } = this.props;

    return (
      <StyledVideo
        autoPlay={autoPlay}
        className="aip-video"
        controls={nativeControls}
        innerRef={this.mediaRef}
        onClick={this.clickHandler}
        onLoadedMetadata={this.loadedMetadataHandler}
        onPause={pauseHandler}
        onPlay={playHandler}
        onSeeked={this.seekedHandler}
        onSeeking={this.seekingHandler}
        onTimeUpdate={this.timeUpdateHandler}
        onVolumeChange={this.volumeChangeHandler}
        playsInline={true}
        preload={preload}
        tabIndex={nativeControls ? 0 : -1}
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
    const { subtitlesTracks } = this.props;

    if (!this.mediaRef.current || !subtitlesTracks) {
      return;
    }

    const videoTracks = [
      ...this.mediaRef.current.textTracks[Symbol.iterator]()
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
      this.props.updateTracksList(visibleTracks);
    }
  };

  private clickHandler = () => {
    const media = this.mediaRef.current!;
    media.paused ? media.play() : media.pause();
  };

  private seekedHandler = () => {
    if (this.props.isSeeking) {
      this.props.stopSeeking();
    }
  };

  private seekingHandler = () => {
    if (!this.props.isSeeking) {
      this.props.startSeeking();
    }
  };

  private timeUpdateHandler = () => {
    const media = this.mediaRef.current!;
    this.props.updateCurrentTime(media.currentTime);
  };

  private loadedMetadataHandler = () => {
    const media = this.mediaRef.current!;
    this.props.updateMediaDuration(media.duration);
  };

  /**
   * `volumechange` covers both volume level and mute toggle. A couple of checks
   * need to be performed to catch changes and dispatch them to update the
   * application state.
   */
  private volumeChangeHandler = () => {
    const media = this.mediaRef.current!;
    const { isMuted, volume } = this.props;

    // only dispatch `toggleMute` when state is behind video object property
    if ((!isMuted && media.muted) || (isMuted && !media.muted)) {
      this.props.toggleMute(media.muted);
    }

    if (media.volume !== volume) {
      this.props.changeVolume(media.volume);
    }
  };
}

const mapStateToProps = (state: IAianaState) => ({
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
});

const mapDispatchToProps = {
  changeVolume,
  mediaElementMounted,
  mediaElementUnounted,
  pauseHandler: pauseMedia,
  playHandler: playMedia,
  startSeeking,
  stopSeeking,
  toggleMute,
  updateCurrentTime,
  updateMediaDuration,
  updateTracksList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoPlayer);
