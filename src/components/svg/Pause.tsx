import React from 'react';

function SvgPause(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 36 36" {...props}>
      <path d="M10 27h5V9h-5zM20 9v18h5V9z" />
    </svg>
  );
}

export default SvgPause;
