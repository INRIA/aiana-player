import React, { Component } from 'react';
import styled from '../../utils/styled-components';
import { MEDIA_CLASSNAME } from '../../constants/player';
import MediaSubtitlesTrack, { ITrack } from './MediaSubtitlesTrack';
import MediaChapterTrack from '../chapters/MediaChapterTrack';
import AdditionalInfosTrack from './AdditionalInfosTrack';
import SlidesTrack from '../slides/SlidesTrack';
import { IChaptersTrack } from '../../reducers/chapters';
import { ISlidesTrack } from '../../reducers/slides';
import {
  IRawTrackExt,
  convertTimeRanges,
  ITimeRange,
  isDisplayableTrack
} from '../../utils/media';
import MediaContext from '../../contexts/MediaContext';

interface IProps {
  additionalInformationTracks: ITrack[];
  autoPlay: boolean;
  chaptersSources: IChaptersTrack[];
  currentTime: number;
  isMuted: boolean;
  isPlaying: boolean;
  isSeeking: boolean;
  playbackRate: number;
  poster?: string;
  preload: string;
  slidesTracksSources: ISlidesTrack[];
  src: string;
  subtitlesSources: ITrack[];
  subtitlesTracks: IRawTrackExt[];
  volume: number;
  changeVolume(volume: number): void;
  pauseMedia(): void;
  playMedia(): void;
  seek(seekingTime: number): void;
  stopSeeking(): void;
  toggleMute(mute: boolean): void;
  updateBufferedRanges(timeRanges: ITimeRange[]): void;
  setCurrentTime(time: number): void;
  updateMediaDuration(duration: number): void;
  updateSubtitlesTracksList(subtitlesTracks: IRawTrackExt[]): void;
}

const StyledVideo = styled.video`
  display: block;

  margin: 0;

  max-width: 100%;
  max-height: 100%;

  transform: translate3d(0, 0, 0);
`;

class StaticMedia extends Component<IProps> {
  static contextType = MediaContext;

  render() {
    return (
      <StyledVideo
        autoPlay={this.props.autoPlay}
        className={MEDIA_CLASSNAME}
        onClick={this.clickHandler}
        onLoadedMetadata={this.loadedMetadataHandler}
        onProgress={this.progressHandler}
        onSeeked={this.seekedHandler}
        onSeeking={this.seekingHandler}
        onTimeUpdate={this.timeUpdateHandler}
        playsInline={true}
        poster={this.props.poster}
        preload={this.props.preload}
        src={this.props.src}
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
    );
  }

  componentDidMount() {
    if (this.props.isPlaying) {
      const [media] = this.context;
      media.play();
    }
  }

  componentDidUpdate(prevProps: IProps) {
    const [media] = this.context;

    // media source change
    if (
      this.props.src &&
      (!prevProps.src || (prevProps.src && this.props.src !== prevProps.src))
    ) {
      media.currentTime = prevProps.currentTime;

      if (this.props.isPlaying) {
        this.props.playMedia();
        media.play();
      }
    }

    // playback rate change
    if (media.playbackRate !== this.props.playbackRate) {
      media.playbackRate = this.props.playbackRate;
    }

    // volume change
    if (media.volume !== this.props.volume) {
      media.volume = this.props.volume;
    }

    // muted change
    if (media.muted !== this.props.isMuted) {
      media.muted = this.props.isMuted;
    }
  }

  progressHandler = () => {
    const [media] = this.context;
    const bufferedRanges = convertTimeRanges(media.buffered);
    this.props.updateBufferedRanges(bufferedRanges);
  };

  clickHandler = () => {
    const [media] = this.context;
    if (media.paused) {
      media.play();
      this.props.playMedia();
    } else {
      media.pause();
      this.props.pauseMedia();
    }
  };

  seekedHandler = () => {
    if (this.props.isSeeking) {
      this.props.stopSeeking();
    }
  };

  seekingHandler = () => {
    if (!this.props.isSeeking) {
      const [media] = this.context;

      this.props.seek(media.currentTime);
    }
  };

  timeUpdateHandler = () => {
    const [media] = this.context;
    this.props.setCurrentTime(media.currentTime);
  };

  loadedMetadataHandler = () => {
    const [media] = this.context;
    this.props.updateMediaDuration(media.duration);
    media.currentTime = this.props.currentTime;
    this.props.seek(this.props.currentTime);
  };
}

export default StaticMedia;
