import React from 'react';

function SvgArrowForward(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 36 36" {...props}>
      <path d="M8 16v4h17v-4z" />
      <path d="M26 15.172L28.828 18 18.222 28.607l-2.829-2.829z" />
      <path d="M28.828 18L26 20.828 15.393 10.222l2.829-2.829z" />
    </svg>
  );
}

export default SvgArrowForward;
