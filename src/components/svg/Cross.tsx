import React from 'react';

function SvgCross(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 36 36" {...props}>
      <path d="M22.95 10.222L18 15.172l-4.95-4.95-2.828 2.828 4.95 4.95-4.95 4.95 2.828 2.828 4.95-4.95 4.95 4.95 2.828-2.828-4.95-4.95 4.95-4.95z" />
    </svg>
  );
}

export default SvgCross;
