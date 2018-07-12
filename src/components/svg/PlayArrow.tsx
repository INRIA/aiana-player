import * as React from 'react';

const PlayArrow: React.SFC = (props) => (
  <svg width={48} height={48} {...props}>
    <path d="M16 10v28l22-14z" />
  </svg>
);

export default PlayArrow;
