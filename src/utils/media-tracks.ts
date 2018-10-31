import { ITrack } from 'src/components/video/VideoTextTrack';
import {
  TRACK_KIND_CAPTIONS,
  TRACK_KIND_CHAPTERS,
  TRACK_KIND_SUBTITLES,
  TRACK_MODE_ACTIVE
} from 'src/constants';

export interface IRawTextTrack {
  activeCues: TextTrackCueList;
  cues: TextTrackCueList;
  readonly kind: string;
  readonly label: string;
  readonly language: string;
  active: boolean;
}

export interface IRawChapterTrack {
  readonly cues: IMediaCue[];
  readonly label: string;
  readonly language: string;
}

export type IRawMetadataTrack = IRawTextTrack;

export interface IMediaCue {
  endTime: number;
  startTime: number;
  text: string;
}

export function rawTextTrack(textTrack: TextTrack): IRawTextTrack {
  const { activeCues, cues, kind, label, language, mode } = textTrack;

  return {
    active: mode === TRACK_MODE_ACTIVE,
    activeCues,
    cues,
    kind,
    label,
    language
  };
}

/**
 * Strips unwanted properties from a TextTrack.
 * @param track {TextTrack}
 */
export function rawChapterTrack(track: TextTrack): IRawChapterTrack {
  const { cues: trackCues, label, language } = track;

  const cues: IMediaCue[] = [...trackCues[Symbol.iterator]()].map(
    (cue: TextTrackCue) => ({
      endTime: cue.endTime,
      startTime: cue.startTime,
      text: cue.text
    })
  );

  return {
    cues,
    label,
    language
  };
}

/**
 * Tests if a track should be displayed as a subtitles.
 *
 * @param track
 */
export function isDisplayableTrack(
  track: TextTrack | IRawTextTrack | ITrack
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
 * @param track {IRawTextTrack}
 */
export function isActiveTrack(track: IRawTextTrack): boolean {
  return track.active === true;
}
