import React from 'react';

function SvgVolumeMuted(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 36 36" {...props}>
      <path d="M22.5 18a4.5 4.5 0 0 0-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 27 18c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM10.27 9L9 10.27 13.73 15H9v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L25.73 27 27 25.73l-9-9zM18 10l-2.09 2.09L18 14.18z" />
    </svg>
  );
}

export default SvgVolumeMuted;
