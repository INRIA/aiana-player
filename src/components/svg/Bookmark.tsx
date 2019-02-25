import React from 'react';

function SvgBookmark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 36 36" {...props}>
      <path d="M11 8v22l7-5 7 5V8z" />
    </svg>
  );
}

export default SvgBookmark;
