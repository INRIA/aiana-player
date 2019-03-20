import React from 'react';

function SvgResizeNs(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 36 36" {...props}>
      <path d="M18 16v-6h3l-4-5-4 5h3v18h-3l4 5 4-5h-3z" />
    </svg>
  );
}

export default SvgResizeNs;
