import * as React from 'react';

interface IProps {
  id?: string;
  radius?: number;
}

function ErodeFilter({ id = 'aip-filter-erode', radius = 1 }: IProps) {
  return (
    <filter id={id}>
      <feMorphology operator="erode" radius={radius} />
    </filter>
  );
}

export default ErodeFilter;
