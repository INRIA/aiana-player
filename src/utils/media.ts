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
