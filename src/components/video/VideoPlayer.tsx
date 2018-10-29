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
} from 'src/actions/player';
import { IAianaState } from 'src/reducers/index';
import { ISlidesTrack } from 'src/reducers/slides';
import {
  IRawTextTrack,
  isChapterTrack,
  isDisplayableTrack,
  rawTextTrack
} from 'src/utils/media-tracks';
import styled from 'src/utils/styled-components';
import AdditionalInfosTrack from './AdditionalInfosTrack';
import MediaChapterTrack from './MediaChapterTrack';
import SlidesTrack from './SlidesTrack';
import VideoTextTrack, { ITrack } from './VideoTextTrack';

const StyledVideo = styled.div`
  position: absolute;
  left: 0;
  bottom: 4.25em;
  display: block;
  width: 50%;
  height: calc(49% - 2.125em);

  video {
    display: block;
    max-width: 100%;
    max-height: 100%;
    margin: auto;
  }
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
  additionalInformationsTracks?: ITrack[];
  autoPlay: boolean;
  currentTime: number;
  isMuted: boolean;
  isSeeking: boolean;
  language: string;
  nativeControls: boolean;
  preload: string;
  slidesTracksSources: ISlidesTrack[];
  sources: ISource[];
  subtitlesTracks?: ITrack[];
  textTracks: IRawTextTrack[];
  volume: number;
}

interface IProps extends IVideoProps, IDispatchProps {}

class VideoPlayer extends React.Component<IProps> {
  private mediaRef = React.createRef<HTMLVideoElement>();

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
      additionalInformationsTracks,
      autoPlay,
      nativeControls,
      pauseHandler,
      playHandler,
      preload,
      slidesTracksSources,
      sources,
      subtitlesTracks
    } = this.props;

    return (
      <StyledVideo className="aip-video">
        <video
          autoPlay={autoPlay}
          controls={nativeControls}
          ref={this.mediaRef}
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
            sources.map((source, idx) => <source key={idx} {...source} />)}

          {subtitlesTracks &&
            subtitlesTracks
              .filter(isDisplayableTrack)
              .map((track, idx) => <VideoTextTrack key={idx} {...track} />)}

          {subtitlesTracks &&
            subtitlesTracks
              .filter(isChapterTrack)
              .map((track, idx) => <MediaChapterTrack key={idx} {...track} />)}

          {additionalInformationsTracks &&
            additionalInformationsTracks.map((track, idx) => (
              <AdditionalInfosTrack key={idx} {...track} />
            ))}

          {slidesTracksSources &&
            slidesTracksSources.map((track, idx) => (
              <SlidesTrack key={idx} {...track} />
            ))}
        </video>
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
  additionalInformationsTracks: state.player.additionalInformationsTracks,
  autoPlay: state.player.autoPlay,
  currentTime: state.player.currentTime,
  isMuted: state.player.isMuted,
  isSeeking: state.player.isSeeking,
  language: state.preferences.language,
  nativeControls: state.player.nativeControls,
  preload: state.player.preload,
  slidesTracksSources: state.slides.sourceTracks,
  sources: state.player.sources,
  subtitlesTracks: state.player.sourceTracks,
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
