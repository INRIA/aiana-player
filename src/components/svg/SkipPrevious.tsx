import React from 'react';

function SvgSkipPrevious(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 36 36" {...props}>
      <path d="M29 26V10l-10 8z" />
      <path d="M20 26V10l-10 8z" />
      <path d="M11 26V10H7v16z" />
    </svg>
  );
}

export default SvgSkipPrevious;
