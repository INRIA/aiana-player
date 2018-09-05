import * as React from 'react';

const Fullscreen: React.SFC = (props) => (
  <svg {...props}>
    <path d="M0 12h24v24H0z" fill="none" />
    <path d="M10.5 21h-3v7.5H15v-3h-4.5zm-3-6h3v-4.5H15v-3H7.5zm18 10.5H21v3h7.5V21h-3zM21 7.5v3h4.5V15h3V7.5z" />
  </svg>
);

export default Fullscreen;
