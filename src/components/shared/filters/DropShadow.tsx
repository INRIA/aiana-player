import * as React from 'react';

interface IProps {
  dx?: string | number;
  deviation?: string | number;
  height?: string | number;
  id?: string;
}

function DropShadow({
  id = 'aip-filter-dropshadow',
  height = '100%',
  deviation = 1,
  dx = 1
}: IProps) {
  return (
    <filter id={id} height={height}>
      <feGaussianBlur in="SourceAlpha" stdDeviation={deviation} />
      <feOffset dx={dx} dy={dx} result="offsetblur" />
      <feMerge>
        <feMergeNode />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  );
}

export default DropShadow;
