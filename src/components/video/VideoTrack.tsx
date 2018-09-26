import * as React from 'react';

export interface ITrack {
  isDefault?: boolean;
  kind?: 'subtitles' | 'captions' | 'descriptions' | 'chapters' | 'metadata';
  label?: string | undefined;
  src: string;
  srcLang?: string | undefined;
}

const VideoTrack: React.SFC<ITrack> = ({
  isDefault = false,
  kind = 'subtitles',
  label,
  src,
  srcLang
}) => (
  <track
    default={isDefault}
    kind={kind}
    label={label}
    src={src}
    srcLang={srcLang}
  />
);

export default VideoTrack;
