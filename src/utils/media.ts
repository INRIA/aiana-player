import { ITrack } from '../components/media/MediaSubtitlesTrack';
import {
  TRACK_MODE_ACTIVE,
  TRACK_KIND_SUBTITLES,
  TRACK_KIND_CAPTIONS,
  TRACK_KIND_CHAPTERS
} from '../constants/tracks';

export interface IRawTrack {
  active: boolean;
  readonly cues: IMediaCue[];
  readonly label?: string;
  readonly language: string;
}

export interface IRawTrackExt extends IRawTrack {
  readonly activeCues?: IMediaCue[];
  readonly kind?: string;
  mode?: TextTrackMode | number;
}

export interface ITimeRange {
  endTime: number;
  startTime: number;
}

export interface IMediaCue extends ITimeRange {
  text: string;
}

export function getTrackKey(track: IRawTrack) {
  return `${track.language}-${track.label || 'unlabeled'}`;
}

export function rawSubtitlesTrack(
  textTrack: TextTrack,
  subtitlesLanguage?: string
): IRawTrackExt {
  const { activeCues, cues, kind, label, language } = textTrack;

  return {
    active: language === subtitlesLanguage,
    activeCues: [...activeCues].map((cue) => ({
      endTime: cue.endTime,
      startTime: cue.startTime,
      text: cue.text
    })),
    cues: [...cues].map((cue) => ({
      startTime: cue.startTime,
      endTime: cue.endTime,
      text: cue.text
    })),
    kind,
    label,
    language,
    mode: TRACK_MODE_ACTIVE
  };
}

export const rawTextTrack = rawSubtitlesTrack;

/**
 * Strips unwanted properties from a TextTrack.
 * @param track {TextTrack}
 */
export function rawChaptersTrack(
  track: TextTrack,
  currentLanguage?: string
): IRawTrack {
  const { cues: trackCues, label, language } = track;

  const cues: IMediaCue[] = [...trackCues].map((cue: TextTrackCue) => ({
    endTime: cue.endTime,
    startTime: cue.startTime,
    text: cue.text
  }));

  return {
    active: language === currentLanguage,
    cues,
    label,
    language
  };
}

export function rawSlidesTrack(track: TextTrack): IRawTrack {
  const rawTrack: IRawTrack = rawChaptersTrack(track);
  return rawTrack;
}

interface IWithKind {
  kind?: string;
}

/**
 * Tests if a track should be displayed as a subtitles.
 *
 * @param track
 */
export function isDisplayableTrack(track: IWithKind): boolean {
  return (
    track.kind === undefined ||
    track.kind === TRACK_KIND_SUBTITLES ||
    track.kind === TRACK_KIND_CAPTIONS
  );
}

/**
 * Tests if a track should be used as a collection of chapters.
 * @param track
 */
export function isChapterTrack(track: IWithKind) {
  return track.kind === TRACK_KIND_CHAPTERS;
}

/**
 * Tests if a subtitles track is active
 * @param track {IRawTrackExt}
 */
export function isActiveTrack(track: IRawTrack): boolean {
  return track.active === true;
}

export function isDefaultTrack(track: ITrack): boolean {
  return track.isDefault === true;
}

export function convertTimeRanges(timeRanges: TimeRanges): ITimeRange[] {
  const { length } = timeRanges;
  const ranges = [];

  for (let i = 0; i < length; i++) {
    ranges.push({
      endTime: timeRanges.end(i),
      startTime: timeRanges.start(i)
    });
  }

  return ranges;
}

// TODO: type this properly
export function getLastActiveCue(track: TextTrack): IMediaCue | undefined {
  const cue = track.activeCues[track.activeCues.length - 1];

  if (!cue) return;

  return {
    endTime: cue.endTime,
    startTime: cue.startTime,
    text: cue.text
  };
}

export function getCueText(cue?: IMediaCue): string | undefined {
  if (cue) {
    return cue.text;
  }

  return;
}

export function getLastActiveCueText(track: TextTrack): string | undefined {
  return getCueText(getLastActiveCue(track));
}

export interface IMedia {
  buffered: any[];
  currentTime: number;
  duration: number;
  muted: boolean;
  paused: boolean;
  playbackRate: number;
  type: string;
  volume: number;
  pause(): void;
  play(): void;
}

export class HTMLMedia {
  type = 'html';
  selector: string;

  constructor(selector: string) {
    this.selector = selector;
  }

  get buffered() {
    const el = this.getElement();
    if (!el) return [] as any[];
    return (el as HTMLMediaElement).buffered;
  }

  get currentTime() {
    const el = this.getElement();
    if (!el) return 0;
    return (el as HTMLMediaElement).currentTime;
  }

  set currentTime(t: number) {
    const el = this.getElement();
    if (el) {
      (el as HTMLMediaElement).currentTime = t;
    }
  }

  get duration() {
    const el = this.getElement();
    if (!el) return 0;
    return (el as HTMLMediaElement).duration;
  }

  get muted() {
    const el = this.getElement();
    if (!el) return false;
    return (el as HTMLMediaElement).muted;
  }

  set muted(m: boolean) {
    const el = this.getElement();
    if (el) {
      (el as HTMLMediaElement).muted = m;
    }
  }

  get paused() {
    const el = this.getElement();
    if (!el) return true;
    return (el as HTMLMediaElement).paused;
  }

  get playbackRate() {
    const el = this.getElement();
    if (!el) return 1;
    return (el as HTMLMediaElement).playbackRate;
  }

  set playbackRate(p: number) {
    const el = this.getElement();
    if (el) {
      (el as HTMLMediaElement).playbackRate = p;
    }
  }

  get volume() {
    const el = this.getElement();
    if (!el) return 0;
    return (el as HTMLMediaElement).volume;
  }

  set volume(v: number) {
    const el = this.getElement();
    if (el) {
      (el as HTMLMediaElement).volume = v;
    }
  }

  getElement() {
    return document.querySelector(this.selector);
  }

  pause() {
    const el = this.getElement();
    if (!el) return;
    (el as HTMLMediaElement).pause();
  }

  play() {
    const el = this.getElement();
    if (!el) return;
    (el as HTMLMediaElement).play();
  }
}

interface IInitParams {
  isPlaying: boolean;
  lang: string;
  listeners: {
    onReady(duration: number): void;
  };
  currentTimeUpdatedHandler: (time: number) => void;
  pauseMedia: () => void;
  playMedia: () => void;
  seek: (time: number) => void;
  stopSeeking: () => void;
  updateBufferedRanges: (timeRanges: ITimeRange[]) => void;
}

/**
 * Wrapper for YT.Player object.
 *
 * @see https://developers.google.com/youtube/iframe_api_reference
 */
export class YouTubeMedia {
  type = 'youtube';

  videoId: string;
  isPlaying: boolean = false;
  duration?: number;

  player?: YT.Player;
  isReady: boolean = false;
  timer?: number;

  currentTimeUpdatedHandler?(time: number): void;
  pauseMedia = () => {};
  playMedia = () => {};
  seek = (t: number) => {};
  stopSeeking = () => {};
  updateBufferedRanges = (timeRanges: ITimeRange[]) => {};

  constructor(videoId: string) {
    this.videoId = videoId;
  }

  init = (params: IInitParams) => {
    this.currentTimeUpdatedHandler = params.currentTimeUpdatedHandler;
    this.updateBufferedRanges = params.updateBufferedRanges;
    this.isPlaying = params.isPlaying;
    this.seek = params.seek;
    this.stopSeeking = params.stopSeeking;
    this.playMedia = params.playMedia;
    this.pauseMedia = params.pauseMedia;

    this.player = new YT.Player('aip-yt-container', {
      height: '100%',
      width: '100%',
      videoId: this.videoId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        enablejsapi: 1,
        fs: 0,
        hl: params.lang,
        iv_load_policy: 3, // eslint-disable-line
        modestbranding: 1,
        origin: window.location.origin,
        playsinline: 1,
        rel: 0,
        showinfo: 0
      },
      events: {
        onReady: (evt) => {
          this.isReady = true;
          this.duration = evt.target.getDuration();
          params.listeners.onReady(this.duration);
          params.updateBufferedRanges([]);

          if (this.isPlaying) {
            evt.target.playVideo();
          } else {
            evt.target.pauseVideo();
          }
        },
        onStateChange: (evt) => {
          if (evt.data === 1) {
            // play state
            this.playMedia();
            this.currentTimeUpdateTicker();
          } else if (evt.data === 2) {
            // pause state
            this.pauseMedia();
            clearTimeout(this.timer);
          }
        }
      }
    });
  };

  /**
   * TODO: current subtitles text should be updated here.
   */
  currentTimeUpdateTicker = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (this.isReady && this.player && this.currentTimeUpdatedHandler) {
        const loadedFraction = this.player.getVideoLoadedFraction();
        const loadedDuration = loadedFraction * this.duration!;
        this.updateBufferedRanges([{ startTime: 0, endTime: loadedDuration }]);
        this.currentTimeUpdatedHandler(this.player.getCurrentTime());
      }
      this.currentTimeUpdateTicker();
    }, 250);
  };

  /**
   * Cleanup function.
   * It should be called before unmounting YouTube container.
   */
  destroy = () => {
    clearTimeout(this.timer);
    if (this.player) this.player.destroy();
  };

  play() {
    if (!this.player || !this.isReady) return;
    this.player.playVideo();
  }

  pause() {
    if (!this.player || !this.isReady) return;
    this.player.pauseVideo();
    clearTimeout(this.timer);
  }

  /**
   * TODO: to be implemented
   */
  get buffered() {
    return [] as any[];
  }

  get currentTime() {
    if (!this.player || !this.isReady) return 0;
    return this.player.getCurrentTime();
  }

  set currentTime(t: number) {
    if (!this.player || !this.isReady || !this.currentTimeUpdatedHandler)
      return;

    this.seek(t);
    this.player.seekTo(t, true);
    if (!this.isPlaying) {
      this.pause();
    }
    this.currentTimeUpdatedHandler(t);

    this.stopSeeking();
  }

  get muted() {
    if (!this.player || !this.isReady) return false;
    return this.player.isMuted();
  }

  set muted(m: boolean) {
    if (!this.player || !this.isReady) return;

    if (m) {
      this.player.mute();
    } else {
      this.player.unMute();
    }
  }

  get paused() {
    if (!this.player || !this.isReady) return true;
    // see YT.PlayerState.PAUSED
    return this.player.getPlayerState() === 2;
  }

  get playbackRate() {
    if (!this.player || !this.isReady) return 1;
    return this.player.getPlaybackRate();
  }

  set playbackRate(p: number) {
    if (!this.player || !this.isReady) return;
    this.player.setPlaybackRate(p);
  }

  get volume() {
    if (!this.player || !this.isReady) return 0;
    // volume is always between 0 and 1
    return this.player.getVolume() / 100;
  }

  set volume(v: number) {
    if (!this.player || !this.isReady) return;
    this.player.setVolume(100 * v);
  }
}
