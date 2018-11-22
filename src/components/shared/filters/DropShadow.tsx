import * as React from 'react';

interface IProps {
  dx?: number;
  deviation?: number;
  height?: number;
  id?: string;
}

const DropShadow: React.SFC<IProps> = ({
  id = 'aip-filter-dropshadow',
  height = '100%',
  deviation = 1,
  dx = 1
}) => (
  <filter id={id} height={height}>
    <feGaussianBlur in="SourceAlpha" stdDeviation={deviation} />
    <feOffset dx={dx} dy={dx} result="offsetblur" />
    <feMerge>
      <feMergeNode />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
);

export default DropShadow;
