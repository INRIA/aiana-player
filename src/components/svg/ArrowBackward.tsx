import React from 'react';

function SvgArrowBackward(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 36 36" {...props}>
      <path d="M30 20v-4H10v4z" />
      <path d="M8 20.828L5.172 18l12.02-12.02 2.829 2.828z" />
      <path d="M5.172 18L8 15.172l12.02 12.02-2.828 2.829z" />
    </svg>
  );
}

export default SvgArrowBackward;
