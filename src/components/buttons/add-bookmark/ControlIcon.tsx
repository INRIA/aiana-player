import * as React from 'react';
import StyledSvg from 'src/components/styled/StyledSvg';
import BookmarkAddIcon from 'src/components/svg/BookmarkAdd';

const StyledIcon = StyledSvg.withComponent(BookmarkAddIcon);

const ControlIcon: React.SFC = () => <StyledIcon />;

export default ControlIcon;
