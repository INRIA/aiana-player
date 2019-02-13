import React from 'react';
import { connect } from 'react-redux';
import {
  changeVolume,
  mediaElementMounted,
  mediaElementUnounted,
  requestMediaPause,
  requestMediaPlay,
  startSeeking,
  stopSeeking,
  toggleMute,
  updateBufferedRanges,
  updateCurrentTime,
  updateMediaDuration
} from '../../actions/player';
import { updateSubtitlesTracksList } from '../../actions/subtitles';
import { IChaptersTrack } from '../../reducers/chapters';
import { IAianaState } from '../../reducers/index';
import { ISlidesTrack } from '../../reducers/slides';
import { IRawSubtitlesTrack, isDisplayableTrack } from '../../utils/media';
import styled from '../../utils/styled-components';
import MediaChapterTrack from '../chapters/MediaChapterTrack';
import withWindow, { IWindow } from '../hocs/withWindow';
import SlidesTrack from '../slides/SlidesTrack';
import AdditionalInfosTrack from './AdditionalInfosTrack';
import MediaSubtitlesTrack, { ITrack } from './MediaSubtitlesTrack';

const StyledVideo = styled.video`
  display: block;

  margin: auto;

  max-width: 100%;
  max-height: 100%;

  transform: translate3d(0, 0, 0);
`;

export interface ISource {
  type?: string;
  src: string;
}

interface IDispatchProps {
  requestMediaPause: any;
  requestMediaPlay: any;
  changeVolume(volume: number): void;
  mediaElementMounted(media: HTMLMediaElement): void;
  mediaElementUnounted(): void;
  startSeeking(): void;
  stopSeeking(): void;
  toggleMute(muted: boolean): void;
  updateBufferedRanges(timeRanges: TimeRanges): void;
  updateCurrentTime(time: number): void;
  updateMediaDuration(duration: number): void;
  updateSubtitlesTracksList(subtitlesTracks: IRawSubtitlesTrack[]): void;
}

interface IStateProps {
  additionalInformationsTracks: ITrack[];
  autoPlay: boolean;
  chaptersSources: IChaptersTrack[];
  currentLanguage: string;
  currentTime: number;
  isMuted: boolean;
  isSeeking: boolean;
  playbackRate: number;
  preload: string;
  slidesTracksSources: ISlidesTrack[];
  sources: ISource[];
  subtitlesSources: ITrack[];
  subtitlesTracks: IRawSubtitlesTrack[];
  volume: number;
}

interface IProps extends IStateProps, IDispatchProps, IWindow {}

class VideoPlayer extends React.Component<IProps> {
  private media = React.createRef<HTMLVideoElement>();

  render() {
    return (
      <StyledVideo
        className="aip-video"
        autoPlay={this.props.autoPlay}
        innerRef={this.media}
        onClick={this.clickHandler}
        onLoadedMetadata={this.loadedMetadataHandler}
        onProgress={this.progressHandler}
        onSeeked={this.seekedHandler}
        onSeeking={this.seekingHandler}
        onTimeUpdate={this.timeUpdateHandler}
        onVolumeChange={this.volumeChangeHandler}
        playsInline={true}
        preload={this.props.preload}
        tabIndex={-1}
      >
        {this.props.sources.map((source, idx) => (
          <source key={idx} {...source} />
        ))}

        {this.props.subtitlesSources
          .filter(isDisplayableTrack)
          .map((track, idx) => (
            <MediaSubtitlesTrack key={idx} {...track} />
          ))}

        {this.props.chaptersSources.map((track, idx) => (
          <MediaChapterTrack key={idx} {...track} />
        ))}

        {this.props.additionalInformationsTracks.map((track, idx) => (
          <AdditionalInfosTrack key={idx} {...track} />
        ))}

        {this.props.slidesTracksSources.map((track, idx) => (
          <SlidesTrack key={idx} {...track} />
        ))}
      </StyledVideo>
    );
  }

  componentDidMount() {
    this.props.mediaElementMounted(this.media.current!);
  }

  componentWillUnmount() {
    this.props.mediaElementUnounted();
  }

  componentDidUpdate() {
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

  private progressHandler = () => {
    this.props.updateBufferedRanges(this.media.current!.buffered);
  };

  private clickHandler = () => {
    if (this.media.current!.paused) {
      this.props.requestMediaPlay(this.media.current!);
    } else {
      this.props.requestMediaPause(this.media.current!);
    }
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
    this.props.updateCurrentTime(this.media.current!.currentTime);
  };

  private loadedMetadataHandler = () => {
    this.props.updateMediaDuration(this.media.current!.duration);
  };

  /**
   * `volumechange` covers both volume level and mute toggle. A couple of checks
   * need to be performed to catch changes and dispatch them to update the
   * application state.
   */
  private volumeChangeHandler = () => {
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

function mapStateToProps(state: IAianaState) {
  return {
    additionalInformationsTracks: state.player.additionalInformationsTracks,
    autoPlay: state.player.autoPlay,
    chaptersSources: state.chapters.sources,
    currentLanguage: state.preferences.currentLanguage,
    currentTime: state.player.currentTime,
    isMuted: state.player.isMuted,
    isSeeking: state.player.isSeeking,
    playbackRate: state.player.playbackRate,
    preload: state.player.preload,
    slidesTracksSources: state.slides.sources,
    sources: state.player.sources,
    subtitlesSources: state.subtitles.sources,
    subtitlesTracks: state.subtitles.subtitlesTracks,
    volume: state.player.volume
  };
}

const mapDispatchToProps = {
  changeVolume,
  mediaElementMounted,
  mediaElementUnounted,
  requestMediaPause,
  requestMediaPlay,
  startSeeking,
  stopSeeking,
  toggleMute,
  updateBufferedRanges,
  updateCurrentTime,
  updateMediaDuration,
  updateSubtitlesTracksList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWindow(VideoPlayer));
