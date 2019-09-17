import React, { useContext, useEffect } from 'react';
import MediaContext from '../../contexts/MediaContext';
import { YouTubeMedia, ITimeRange } from '../../utils/media';

interface IProps {
  currentTime: number;
  isPlaying: boolean;
  lang: string;
  playbackRate: number;
  volume: number;
  seek(seekingTime: number): void;
  startSeeking(): void;
  stopSeeking(): void;
  setCurrentTime(time: number): void;
  updateBufferedRanges(timeRanges: ITimeRange[]): void;
  updateMediaDuration(duration: number): void;
}

function YouTubeMediaContainer(props: IProps) {
  const [media] = useContext(MediaContext);
  const {
    currentTime,
    volume,
    isPlaying,
    lang,
    playbackRate,
    updateMediaDuration,
    seek,
    setCurrentTime,
    startSeeking,
    stopSeeking,
    updateBufferedRanges
  } = props;

  useEffect(() => {
    const listeners = {
      onReady(duration: number) {
        updateMediaDuration(duration);
        media.volume = volume;
        media.playbackRate = playbackRate;
        // only trigger a seek if video isn't at its start point.
        if (currentTime > 0) {
          media.currentTime = currentTime;
        }
      }
    };

    (media as YouTubeMedia).init({
      currentTimeUpdatedHandler: setCurrentTime,
      isPlaying,
      lang,
      listeners,
      seek,
      startSeeking,
      stopSeeking,
      updateBufferedRanges
    });

    return () => {
      media.destroy();
    };
  }, [
    lang,
    updateMediaDuration,
    seek,
    setCurrentTime,
    startSeeking,
    stopSeeking
  ]);

  useEffect(() => {
    media.isPlaying = isPlaying;
  }, [isPlaying]);

  return <div id="aip-yt-container"></div>;
}

export default YouTubeMediaContainer;
