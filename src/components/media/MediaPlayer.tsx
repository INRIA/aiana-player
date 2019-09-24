import React, { useEffect, useRef, useContext } from 'react';
import { connect } from 'react-redux';
import {
  changeVolume,
  pauseMedia,
  playMedia,
  seek,
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
import { IRawTrackExt, ITimeRange } from '../../utils/media';
import styled from '../../utils/styled-components';
import { ITrack } from './MediaSubtitlesTrack';
import StaticMedia from './StaticMedia';
import useMedia from '../../hooks/useMedia';
import MediaContext from '../../contexts/MediaContext';
import YouTubeMediaContainer from './YouTubeMediaContainer';

interface IDispatchProps {
  changeVolume(volume: number): void;
  pauseMedia(): void;
  playMedia(): void;
  seek(seekingTime: number): void;
  setCurrentTime(time: number): void;
  stopSeeking(): void;
  toggleMute(): void;
  updateBufferedRanges(timeRanges: ITimeRange[]): void;
  updateMediaDuration(duration: number): void;
  updateSubtitlesTracksList(subtitlesTracks: IRawTrackExt[]): void;
}

interface IStateProps {
  additionalInformationTracks: ITrack[];
  autoPlay: boolean;
  chaptersSources: IChaptersTrack[];
  currentTime: number;
  isMuted: boolean;
  isPlaying: boolean;
  isSeeking: boolean;
  lang: string;
  playbackRate: number;
  poster?: string;
  preload: string;
  slidesTracksSources: ISlidesTrack[];
  sources: ISource[];
  subtitlesSources: ITrack[];
  subtitlesTracks: IRawTrackExt[];
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

/**
 * Returns the first elligible media source.
 * If no source is marked as selected, first element will be returned.
 *
 * @param sources {ISource[]}
 */
function getCurrentSourceWithFallback(sources: ISource[]): ISource | undefined {
  const selectedSource = getSelectedMediaSource(sources);

  if (selectedSource) {
    return selectedSource;
  }

  const fallbackSource = sources[0];

  if (fallbackSource) {
    return fallbackSource;
  }

  return;
}

function MediaPlayer(props: IProps) {
  const [media] = useContext(MediaContext);
  const { setMedia } = useMedia();

  // `setMedia` will be redefined at every render and cannot be used as a
  // `useEffect` dependency. This is why a ref is used here.
  const setMediaRef = useRef(setMedia);
  const setMediaRefCurrent = setMediaRef.current;
  const selectedSource = getCurrentSourceWithFallback(props.sources);

  useEffect(() => {
    if (selectedSource) {
      setMediaRefCurrent(selectedSource.src);
    }
  }, [selectedSource, setMediaRefCurrent]);

  if (!selectedSource || !media) {
    return null;
  }

  return (
    <StyledDiv>
      {media.type === 'html' && (
        <StaticMedia
          additionalInformationTracks={props.additionalInformationTracks}
          autoPlay={props.autoPlay}
          changeVolume={props.changeVolume}
          chaptersSources={props.chaptersSources}
          currentTime={props.currentTime}
          isMuted={props.isMuted}
          isPlaying={props.isPlaying}
          isSeeking={props.isSeeking}
          pauseMedia={props.pauseMedia}
          playbackRate={props.playbackRate}
          playMedia={props.playMedia}
          poster={props.poster}
          preload={props.preload}
          seek={props.seek}
          setCurrentTime={props.setCurrentTime}
          slidesTracksSources={props.slidesTracksSources}
          src={selectedSource.src}
          stopSeeking={props.stopSeeking}
          subtitlesSources={props.subtitlesSources}
          subtitlesTracks={props.subtitlesTracks}
          toggleMute={props.toggleMute}
          updateBufferedRanges={props.updateBufferedRanges}
          updateMediaDuration={props.updateMediaDuration}
          updateSubtitlesTracksList={props.updateSubtitlesTracksList}
          volume={props.volume}
        />
      )}

      {media.type === 'youtube' && (
        <YouTubeMediaContainer
          currentTime={props.currentTime}
          isPlaying={props.isPlaying}
          lang={props.lang}
          pauseMedia={props.pauseMedia}
          playMedia={props.playMedia}
          playbackRate={props.playbackRate}
          volume={props.volume}
          seek={props.seek}
          setCurrentTime={props.setCurrentTime}
          stopSeeking={props.stopSeeking}
          updateBufferedRanges={props.updateBufferedRanges}
          updateMediaDuration={props.updateMediaDuration}
        />
      )}
    </StyledDiv>
  );
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
    lang: state.preferences.language,
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
  pauseMedia,
  playMedia,
  seek,
  stopSeeking,
  toggleMute,
  updateBufferedRanges,
  setCurrentTime,
  updateMediaDuration,
  updateSubtitlesTracksList
};

export default connect(
  mapState,
  mapDispatch
)(withWidget(MediaPlayer));
