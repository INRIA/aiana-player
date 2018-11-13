import * as React from 'react';

interface IProps {
  id?: string;
  radius?: number;
}
const ErodeFilter: React.SFC<IProps> = ({
  id = 'aip-filter-erode',
  radius = 1
}) => (
  <filter id={id}>
    <feMorphology operator="erode" radius={radius} />
  </filter>
);

export default ErodeFilter;
