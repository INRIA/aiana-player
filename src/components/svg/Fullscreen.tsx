import * as React from 'react';

const Fullscreen: React.SFC = (props) => (
  <svg width={48} height={48} {...props}>
    <path d="M14 28h-4v10h10v-4h-6v-6zm-4-8h4v-6h6v-4H10v10zm24 14h-6v4h10V28h-4v6zm-6-24v4h6v6h4V10H28z" />
  </svg>
);

export default Fullscreen;
