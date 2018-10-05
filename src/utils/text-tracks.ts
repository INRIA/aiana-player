export interface IRawTextTrack {
  readonly activeCues: TextTrackCueList;
  readonly cues: TextTrackCueList;
  readonly kind: string;
  readonly label: string;
  readonly language: string;
  active: boolean;
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

export function isDisplayableTrack(track: TextTrack | IRawTextTrack) {
  return track.kind === 'subtitles' || track.kind === 'captions';
}
