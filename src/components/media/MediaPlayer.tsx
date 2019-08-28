import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import {
  changeVolume,
  requestMediaPause,
  requestMediaPlay,
  requestSeek,
  startSeeking,
  stopSeeking,
  toggleMute,
  updateBufferedRanges,
  setCurrentTime,
  updateMediaDuration
} from '../../actions/player';
import { updateSubtitlesTracksList } from '../../actions/subtitles';
import withWidget from '../../hocs/with-widget';
import { IAianaState } from '../../reducers';
import { IChaptersTrack } from '../../reducers/chapters';
import { ISource, getSelectedMediaSource } from '../../reducers/player';
import { ISlidesTrack } from '../../reducers/slides';
import {
  IRawSubtitlesTrack,
  isDisplayableTrack,
  convertTimeRanges,
  IBufferedRange
} from '../../utils/media';
import styled from '../../utils/styled-components';
import MediaChapterTrack from '../chapters/MediaChapterTrack';
import SlidesTrack from '../slides/SlidesTrack';
import AdditionalInfosTrack from './AdditionalInfosTrack';
import MediaSubtitlesTrack, { ITrack } from './MediaSubtitlesTrack';
import { MEDIA_CLASSNAME } from '../../constants/player';

interface IDispatchProps {
  changeVolume(volume: number): void;
  requestMediaPause(mediaSelector: string): void;
  requestMediaPlay(mediaSelector: string): void;
  requestSeek(mediaSelector: string, seekingTime: number): void;
  startSeeking(): void;
  stopSeeking(): void;
  toggleMute(): void;
  updateBufferedRanges(timeRanges: IBufferedRange[]): void;
  updateCurrentTime(time: number): void;
  updateMediaDuration(duration: number): void;
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
  mediaSelector: string;
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

class MediaPlayer extends Component<IProps> {
  media = createRef<HTMLVideoElement>();

  render() {
    const selectedSource = getCurrentSourceWithFallback(this.props.sources);

    if (!selectedSource) {
      return null;
    }

    return (
      <StyledDiv>
        <StyledVideo
          autoPlay={this.props.autoPlay}
          className={MEDIA_CLASSNAME}
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

  componentDidUpdate(prevProps: IStateProps) {
    const currentSource = getCurrentSourceWithFallback(this.props.sources);
    const prevSource = getCurrentSourceWithFallback(prevProps.sources);

    // media source change
    if (
      currentSource &&
      (!prevSource || (prevSource && currentSource.src !== prevSource.src))
    ) {
      this.media.current!.currentTime = prevProps.currentTime;

      if (this.props.isPlaying) {
        this.props.requestMediaPlay(this.props.mediaSelector);
      }
    }

    // playback rate change
    if (this.media.current!.playbackRate !== this.props.playbackRate) {
      this.media.current!.playbackRate = this.props.playbackRate;
    }

    // volume change
    if (this.media.current!.volume !== this.props.volume) {
      this.media.current!.volume = this.props.volume;
    }

    // muted change
    if (this.media.current!.muted !== this.props.isMuted) {
      this.media.current!.muted = this.props.isMuted;
    }
  }

  progressHandler = () => {
    const bufferedRanges = convertTimeRanges(this.media.current!.buffered);
    this.props.updateBufferedRanges(bufferedRanges);
  };

  clickHandler = () => {
    if (this.media.current!.paused) {
      this.props.requestMediaPlay(this.props.mediaSelector);
    } else {
      this.props.requestMediaPause(this.props.mediaSelector);
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
    this.props.requestSeek(this.props.mediaSelector, this.props.currentTime);
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
      // this.props.toggleMute(media.muted);
      this.props.toggleMute();
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
    mediaSelector: state.player.mediaSelector,
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
  requestMediaPause,
  requestMediaPlay,
  requestSeek,
  startSeeking,
  stopSeeking,
  toggleMute,
  updateBufferedRanges,
  updateCurrentTime: setCurrentTime,
  updateMediaDuration,
  updateSubtitlesTracksList
};

export default connect(
  mapState,
  mapDispatch
)(withWidget(MediaPlayer));
