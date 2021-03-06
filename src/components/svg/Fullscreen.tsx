import React from 'react';

function SvgFullscreen(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 36 36" {...props}>
      <path d="M11 21H8v7h7v-3h-4zm0-6v-4h4V8H8v7zm14 6h3v7h-7v-3h4zm0-6h3V8h-7v3h4z" />
    </svg>
  );
}

export default SvgFullscreen;
