import React from 'react';

function SvgArrowBackward(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 36 36" {...props}>
      <path d="M28 20v-4H11v4z" />
      <path d="M10 20.828L7.172 18 17.778 7.393l2.829 2.829z" />
      <path d="M7.172 18L10 15.172l10.607 10.606-2.829 2.829z" />
    </svg>
  );
}

export default SvgArrowBackward;
