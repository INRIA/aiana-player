import * as React from 'react';
import StyledSvg from '../../styled/StyledSvg';
import BookmarkAddIcon from '../../svg/BookmarkAdd';

const StyledIcon = StyledSvg.withComponent(BookmarkAddIcon);

const ControlIcon: React.SFC = () => <StyledIcon />;

export default ControlIcon;
