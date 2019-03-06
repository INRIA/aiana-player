import React from 'react';

function SvgArrowForward(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 36 36" {...props}>
      <path d="M6 16v4h20v-4z" />
      <path d="M28 15.172L30.828 18l-12.02 12.02-2.829-2.828z" />
      <path d="M30.828 18L28 20.828 15.98 8.808l2.828-2.829z" />
    </svg>
  );
}

export default SvgArrowForward;
