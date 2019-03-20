import React from 'react';

function SvgMove(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 36 36" {...props}>
      <path d="M18 16v-6h3l-4-5-4 5h3v6h-6v-3l-5 4 5 4v-3h6v6h-3l4 5 4-5h-3v-6h6v3l5-4-5-4v3z" />
    </svg>
  );
}

export default SvgMove;
