import React from 'react';

function SvgSkipNext(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 36 36" {...props}>
      <path d="M7 10v16l10-8z" />
      <path d="M16 10v16l10-8z" />
      <path d="M25 10v16h4V10z" />
    </svg>
  );
}

export default SvgSkipNext;
