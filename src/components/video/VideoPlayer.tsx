import React from 'react';
import { connect } from 'react-redux';
import {
  changeVolume,
  updateMediaElement,
  mediaElementUnounted,
  requestMediaPause,
  requestMediaPlay,
  requestSeek,
  startSeeking,
  stopSeeking,
  toggleMute,
  updateBufferedRanges,
  updateCurrentTime,
  updateMediaDuration
} from '../../actions/player';
import { updateSubtitlesTracksList } from '../../actions/subtitles';
import withWidget from '../../hocs/with-widget';
import { IAianaState } from '../../reducers';
import { IChaptersTrack } from '../../reducers/chapters';
import { ISource, getSelectedMediaSource } from '../../reducers/player';
import { ISlidesTrack } from '../../reducers/slides';
import { IRawSubtitlesTrack, isDisplayableTrack } from '../../utils/media';
import styled from '../../utils/styled-components';
import MediaChapterTrack from '../chapters/MediaChapterTrack';
import SlidesTrack from '../slides/SlidesTrack';
import AdditionalInfosTrack from './AdditionalInfosTrack';
import MediaSubtitlesTrack, { ITrack } from './MediaSubtitlesTrack';

interface IDispatchProps {
  requestMediaPause: any;
  requestMediaPlay: any;
  changeVolume(volume: number): void;
  mediaElementUnounted(): void;
  requestSeek(media: HTMLMediaElement, seekingTime: number): void;
  startSeeking(): void;
  stopSeeking(): void;
  toggleMute(muted: boolean): void;
  updateBufferedRanges(timeRanges: TimeRanges): void;
  updateCurrentTime(time: number): void;
  updateMediaDuration(duration: number): void;
  updateMediaElement(media: HTMLMediaElement): void;
  updateSubtitlesTracksList(subtitlesTracks: IRawSubtitlesTrack[]): void;
}

interface IStateProps {
  additionalInformationTracks: ITrack[];
  autoPlay: boolean;
  chaptersSources: IChaptersTrack[];
  currentTime: number;
  isMuted: boolean;
  isPlaying: boolean;
  isSeeking: boolean;
  mediaElement?: HTMLMediaElement;
  playbackRate: number;
  poster?: string;
  preload: string;
  slidesTracksSources: ISlidesTrack[];
  sources: ISource[];
  subtitlesSources: ITrack[];
  subtitlesTracks: IRawSubtitlesTrack[];
  volume: number;
}

interface IProps extends IStateProps, IDispatchProps {}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const StyledVideo = styled.video`
  display: block;

  margin: 0;

  max-width: 100%;
  max-height: 100%;

  transform: translate3d(0, 0, 0);
`;

function getCurrentSourceWithFallback(sources: ISource[]): ISource | void {
  const selectedSource = getSelectedMediaSource(sources);

  if (selectedSource) {
    return selectedSource;
  }

  const fallbackSource = sources[0];

  if (fallbackSource) {
    return fallbackSource;
  }
}

class VideoPlayer extends React.Component<IProps> {
  media = React.createRef<HTMLVideoElement>();

  render() {
    const selectedSource = getCurrentSourceWithFallback(this.props.sources);

    if (!selectedSource) {
      return null;
    }

    return (
      <StyledDiv>
        <StyledVideo
          autoPlay={this.props.autoPlay}
          ref={this.media}
          onClick={this.clickHandler}
          onLoadedMetadata={this.loadedMetadataHandler}
          onProgress={this.progressHandler}
          onSeeked={this.seekedHandler}
          onSeeking={this.seekingHandler}
          onTimeUpdate={this.timeUpdateHandler}
          onVolumeChange={this.volumeChangeHandler}
          playsInline={true}
          poster={this.props.poster}
          preload={this.props.preload}
          src={selectedSource.src}
          tabIndex={-1}
        >
          {this.props.subtitlesSources
            .filter(isDisplayableTrack)
            .map((track, idx) => (
              <MediaSubtitlesTrack key={idx} {...track} />
            ))}

          {this.props.chaptersSources.map((track, idx) => (
            <MediaChapterTrack key={idx} {...track} />
          ))}

          {this.props.additionalInformationTracks.map((track, idx) => (
            <AdditionalInfosTrack key={idx} {...track} />
          ))}

          {this.props.slidesTracksSources.map((track, idx) => (
            <SlidesTrack key={idx} {...track} />
          ))}
        </StyledVideo>
      </StyledDiv>
    );
  }

  componentDidMount() {
    this.updateMountedMedia();
  }

  componentWillUnmount() {
    this.props.mediaElementUnounted();
  }

  componentDidUpdate(prevProps: IStateProps) {
    const currentSource = getCurrentSourceWithFallback(this.props.sources);
    const prevSource = getCurrentSourceWithFallback(prevProps.sources);

    if (!prevProps.mediaElement && this.props.mediaElement) {
      this.props.requestSeek(this.props.mediaElement, this.props.currentTime);
    }

    if (
      currentSource &&
      (!prevSource || (prevSource && currentSource.src !== prevSource.src))
    ) {
      this.props.updateMediaElement(this.media.current!);
      this.media.current!.currentTime = prevProps.currentTime;

      if (this.props.isPlaying) {
        this.props.requestMediaPlay(this.media.current!);
      }
    }

    if (this.media.current!.playbackRate !== this.props.playbackRate) {
      this.media.current!.playbackRate = this.props.playbackRate;
    }

    if (this.media.current!.volume !== this.props.volume) {
      this.media.current!.volume = this.props.volume;
    }

    if (this.media.current!.muted !== this.props.isMuted) {
      this.media.current!.muted = this.props.isMuted;
    }
  }

  updateMountedMedia = () => {
    if (this.media.current) {
      this.props.updateMediaElement(this.media.current);
      this.props.requestSeek(this.media.current, this.props.currentTime);
    }
  };

  progressHandler = () => {
    this.props.updateBufferedRanges(this.media.current!.buffered);
  };

  clickHandler = () => {
    if (this.media.current!.paused) {
      this.props.requestMediaPlay(this.media.current!);
    } else {
      this.props.requestMediaPause(this.media.current!);
    }
  };

  seekedHandler = () => {
    if (this.props.isSeeking) {
      this.props.stopSeeking();
    }
  };

  seekingHandler = () => {
    if (!this.props.isSeeking) {
      this.props.startSeeking();
    }
  };

  timeUpdateHandler = () => {
    this.props.updateCurrentTime(this.media.current!.currentTime);
  };

  loadedMetadataHandler = () => {
    this.props.updateMediaDuration(this.media.current!.duration);
  };

  /**
   * `volumechange` covers both volume level and mute toggle. A couple of checks
   * need to be performed to catch changes and dispatch them to update the
   * application state.
   */
  volumeChangeHandler = () => {
    const media = this.media.current!;
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

function mapState(state: IAianaState) {
  return {
    additionalInformationTracks: state.player.additionalInformationTracks,
    autoPlay: state.player.autoPlay,
    chaptersSources: state.chapters.sources,
    currentTime: state.player.currentTime,
    isMuted: state.player.isMuted,
    isPlaying: state.player.isPlaying,
    isSeeking: state.player.isSeeking,
    mediaElement: state.player.mediaElement,
    playbackRate: state.player.playbackRate,
    poster: state.player.poster,
    preload: state.player.preload,
    slidesTracksSources: state.slides.sources,
    sources: state.player.sources,
    subtitlesSources: state.subtitles.sources,
    subtitlesTracks: state.subtitles.subtitlesTracks,
    volume: state.player.volume
  };
}

const mapDispatch = {
  changeVolume,
  updateMediaElement,
  mediaElementUnounted,
  requestMediaPause,
  requestMediaPlay,
  requestSeek,
  startSeeking,
  stopSeeking,
  toggleMute,
  updateBufferedRanges,
  updateCurrentTime,
  updateMediaDuration,
  updateSubtitlesTracksList
};

export default connect(
  mapState,
  mapDispatch
)(withWidget(VideoPlayer));
