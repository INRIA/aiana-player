import React from 'react';

function SvgPlayArrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 36 36" {...props}>
      <path d="M12 9v18l15-9z" />
    </svg>
  );
}

export default SvgPlayArrow;
