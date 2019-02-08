import React from 'react';
import StyledSvg from '../../styled/StyledSvg';
import BookmarkAddIcon from '../../svg/BookmarkAdd';

const StyledIcon = StyledSvg.withComponent(BookmarkAddIcon);

function ControlIcon() {
  return <StyledIcon />;
}

export default ControlIcon;
