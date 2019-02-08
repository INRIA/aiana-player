import React from 'react';

function Slide(props: any) {
  return (
    <svg viewBox="0 0 36 36" width="1em" height="1em" {...props}>
      <path d="M11 11h3v3h-3zM11 17h3v3h-3zM11 23h3v3h-3zM16 11h9v3h-9zM16 17h9v3h-9zM16 23h9v3h-9z" />
      <path d="M6 6h24v25H6zm3 3h18v19H9z" fillRule="evenodd" />
    </svg>
  );
}

export default Slide;
