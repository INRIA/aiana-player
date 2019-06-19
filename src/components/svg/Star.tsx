import React from 'react';

function SvgStar(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 36 36" {...props}>
      <path d="M18 7.56l-3.067 7.269-7.922.689 6.004 5.17-1.823 7.752L18 24.355l6.794 4.085-1.822-7.751 6.017-5.171-7.904-.69L18 7.56z" />
    </svg>
  );
}

export default SvgStar;
