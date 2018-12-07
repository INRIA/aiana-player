import * as React from 'react';
import styled from '../../../utils/styled-components';
import DropShadow from './DropShadow';
import ErodeFilter from './Erode';

const StyledSvg = styled.svg`
  display: none;
`;

function SvgFilters() {
  return (
    <StyledSvg className="aip-filters" aria-hidden="true">
      <defs>
        <DropShadow />
        <ErodeFilter />
      </defs>
    </StyledSvg>
  );
}

export default SvgFilters;
