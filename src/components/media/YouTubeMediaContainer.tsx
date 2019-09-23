/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect } from 'react';
import MediaContext from '../../contexts/MediaContext';
import { YouTubeMedia, ITimeRange } from '../../utils/media';

interface IProps {
  currentTime: number;
  isPlaying: boolean;
  lang: string;
  playbackRate: number;
  volume: number;
  pauseMedia(): void;
  playMedia(): void;
  seek(seekingTime: number): void;
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
    playMedia,
    pauseMedia,
    updateMediaDuration,
    seek,
    setCurrentTime,
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
      pauseMedia,
      playMedia,
      seek,
      stopSeeking,
      updateBufferedRanges
    });

    return () => {
      media.destroy();
    };
  }, [
    playMedia,
    pauseMedia,
    lang,
    updateMediaDuration,
    seek,
    setCurrentTime,
    stopSeeking
  ]); // eslint-disable-line

  useEffect(() => {
    media.isPlaying = isPlaying;
  }, [isPlaying]); // eslint-disable-line

  return <div id="aip-yt-container"></div>;
}

export default YouTubeMediaContainer;
