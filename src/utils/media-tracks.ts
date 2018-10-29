import { ITrack } from 'src/components/video/VideoTextTrack';
import {
  TRACK_KIND_CAPTIONS,
  TRACK_KIND_CHAPTERS,
  TRACK_KIND_SUBTITLES
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
    active: mode === 'showing',
    activeCues,
    cues,
    kind,
    label,
    language
  };
}

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
