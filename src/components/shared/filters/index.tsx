import React from 'react';
import DropShadow from './DropShadow';
import ErodeFilter from './Erode';
import { VisuallyHidden } from '../../a11y/AssistiveText';

function SvgFilters() {
  return (
    <VisuallyHidden>
      <svg className="aip-filters" aria-hidden="true">
        <defs>
          <DropShadow />
          <ErodeFilter />
        </defs>
      </svg>
    </VisuallyHidden>
  );
}

export default SvgFilters;
