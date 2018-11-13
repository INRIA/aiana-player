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
  <filter xmlns="http://www.w3.org/2000/svg" id={id} height={height}>
    <feGaussianBlur in="SourceAlpha" stdDeviation={deviation} />
    <feOffset dx={dx} dy={dx} result="offsetblur" />
    <feMerge>
      <feMergeNode />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
);

export default DropShadow;
