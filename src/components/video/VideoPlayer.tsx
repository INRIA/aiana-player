import * as React from 'react';
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
} from 'src/actions/player';
import { updateSubtitlesTracksList } from 'src/actions/subtitles';
import { IChaptersTrack } from 'src/reducers/chapters';
import { IAianaState } from 'src/reducers/index';
import { ISlidesTrack } from 'src/reducers/slides';
import { IRawSubtitlesTrack, isDisplayableTrack } from 'src/utils/media';
import styled from 'src/utils/styled-components';
import MediaChapterTrack from '../chapters/MediaChapterTrack';
import SlidesTrack from '../slides/SlidesTrack';
import AdditionalInfosTrack from './AdditionalInfosTrack';
import MediaSubtitlesTrack, { ITrack } from './MediaSubtitlesTrack';

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
  requestMediaPause: () => any;
  requestMediaPlay: () => any;
  startSeeking: () => void;
  stopSeeking: () => void;
  toggleMute: (muted: boolean) => void;
  updateBufferedRanges: (timeRanges: TimeRanges) => void;
  updateCurrentTime: (time: number) => void;
  updateMediaDuration: (duration: number) => void;
  updateSubtitlesTracksList: (subtitlesTracks: IRawSubtitlesTrack[]) => void;
}

interface IStateProps {
  additionalInformationsTracks: ITrack[];
  autoPlay: boolean;
  chaptersSources: IChaptersTrack[];
  currentTime: number;
  isMuted: boolean;
  isSeeking: boolean;
  language: string;
  preload: string;
  slidesTracksSources: ISlidesTrack[];
  sources: ISource[];
  subtitlesSources: ITrack[];
  subtitlesTracks: IRawSubtitlesTrack[];
  volume: number;
}

interface IProps extends IStateProps, IDispatchProps {}

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
  }

  public componentWillUnmount() {
    this.props.mediaElementUnounted();
  }

  public render() {
    const {
      additionalInformationsTracks,
      autoPlay,
      chaptersSources,
      preload,
      slidesTracksSources,
      sources,
      subtitlesSources
    } = this.props;

    return (
      <StyledVideo className="aip-video">
        <video
          autoPlay={autoPlay}
          ref={this.mediaRef}
          onClick={this.clickHandler}
          onLoadedMetadata={this.loadedMetadataHandler}
          onProgress={this.progressHandler}
          onSeeked={this.seekedHandler}
          onSeeking={this.seekingHandler}
          onTimeUpdate={this.timeUpdateHandler}
          onVolumeChange={this.volumeChangeHandler}
          playsInline={true}
          preload={preload}
          tabIndex={-1}
        >
          {sources.map((source, idx) => (
            <source key={idx} {...source} />
          ))}

          {subtitlesSources.filter(isDisplayableTrack).map((track, idx) => (
            <MediaSubtitlesTrack key={idx} {...track} />
          ))}

          {chaptersSources.map((track, idx) => (
            <MediaChapterTrack key={idx} {...track} />
          ))}

          {additionalInformationsTracks.map((track, idx) => (
            <AdditionalInfosTrack key={idx} {...track} />
          ))}

          {slidesTracksSources.map((track, idx) => (
            <SlidesTrack key={idx} {...track} />
          ))}
        </video>
      </StyledVideo>
    );
  }

  private progressHandler = () => {
    this.props.updateBufferedRanges(this.mediaRef.current!.buffered);
  };

  private clickHandler = () => {
    const media = this.mediaRef.current!;
    if (media.paused) {
      this.props.requestMediaPlay();
    } else {
      this.props.requestMediaPause();
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
    this.props.updateCurrentTime(this.mediaRef.current!.currentTime);
  };

  private loadedMetadataHandler = () => {
    this.props.updateMediaDuration(this.mediaRef.current!.duration);
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
  chaptersSources: state.chapters.sources,
  currentTime: state.player.currentTime,
  isMuted: state.player.isMuted,
  isSeeking: state.player.isSeeking,
  language: state.preferences.language,
  preload: state.player.preload,
  slidesTracksSources: state.slides.sourceTracks,
  sources: state.player.sources,
  subtitlesSources: state.subtitles.sources,
  subtitlesTracks: state.subtitles.subtitlesTracks,
  volume: state.player.volume
});

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
)(VideoPlayer);
