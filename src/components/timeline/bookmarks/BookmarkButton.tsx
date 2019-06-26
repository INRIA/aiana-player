import React from 'react';
import styled from '../../../utils/styled-components';
import GhostButton from '../../shared/GhostButton';
import StyledSvg from '../../shared/styled-svg';
import BookmarkIcon from '../../svg/Bookmark';

interface IProps {
  mediaSelector: string;
  time: number;
  onClick(mediaSelector: string, time: number): void;
}

const FilteredSvg = styled(StyledSvg)`
  filter: url('#aip-filter-dropshadow');
`;

function BookmarkButton(props: IProps) {
  return (
    <GhostButton
      onClick={() => props.onClick(props.mediaSelector, props.time)}
      type="button"
    >
      <FilteredSvg as={BookmarkIcon} />
    </GhostButton>
  );
}

export default BookmarkButton;
