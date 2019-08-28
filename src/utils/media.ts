import { ITrack } from '../components/media/MediaSubtitlesTrack';
import {
  TRACK_MODE_ACTIVE,
  TRACK_KIND_SUBTITLES,
  TRACK_KIND_CAPTIONS,
  TRACK_KIND_CHAPTERS
} from '../constants/tracks';

export interface ILightCue {
  startTime: number;
  endTime: number;
  text: string;
}

export interface IRawSubtitlesTrack {
  active: boolean;
  readonly activeCues: any; // TODO: type this
  readonly cues: ILightCue[];
  readonly kind: string;
  readonly label?: string;
  readonly language: string;
  mode: TextTrackMode | number;
}

export interface IRawChaptersTrack {
  active: boolean;
  readonly cues: IMediaCue[];
  readonly label: string;
  readonly language: string;
}

export type IRawMetadataTrack = IRawSubtitlesTrack;

export type IRawSlidesTrack = IRawChaptersTrack;

export interface IMediaCue {
  endTime: number;
  startTime: number;
  text: string;
}

export interface IBufferedRange {
  end: number;
  start: number;
}

export type BufferedRanges = IBufferedRange[];

export function rawSubtitlesTrack(
  textTrack: TextTrack,
  subtitlesLanguage?: string
): IRawSubtitlesTrack {
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
): IRawChaptersTrack {
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

export function rawSlidesTrack(track: TextTrack): IRawSlidesTrack {
  const rawTrack: IRawSlidesTrack = rawChaptersTrack(track);
  return rawTrack;
}

/**
 * Tests if a track should be displayed as a subtitles.
 *
 * @param track
 */
export function isDisplayableTrack(
  track: TextTrack | IRawSubtitlesTrack | ITrack
): boolean {
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
export function isChapterTrack(track: TextTrack | ITrack) {
  return track.kind === TRACK_KIND_CHAPTERS;
}

/**
 * Tests if a subtitles track is active
 * @param track {IRawSubtitlesTrack}
 */
export function isActiveTrack(
  track: IRawSubtitlesTrack | IRawChaptersTrack
): boolean {
  return track.active === true;
}

export function isDefaultTrack(track: ITrack): boolean {
  return track.isDefault === true;
}

export function convertTimeRanges(timeRanges: TimeRanges): BufferedRanges {
  const { length } = timeRanges;
  const ranges = [];

  for (let i = 0; i < length; i++) {
    ranges.push({
      end: timeRanges.end(i),
      start: timeRanges.start(i)
    });
  }

  return ranges;
}

// TODO: type this properly
export function getLastActiveCue(track: TextTrack): any {
  const cue = track.activeCues[track.activeCues.length - 1];

  if (cue) {
    return {
      endTime: cue.endTime,
      startTime: cue.startTime,
      text: cue.text
    };
  }
}

export function getCueText(cue?: TextTrackCue): string | undefined {
  if (cue) {
    return cue.text;
  }

  return;
}

export function getLastActiveCueText(track: TextTrack): string | undefined {
  return getCueText(getLastActiveCue(track));
}
