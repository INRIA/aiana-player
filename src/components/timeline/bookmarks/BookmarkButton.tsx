import React, { useContext } from 'react';
import styled from '../../../utils/styled-components';
import GhostButton from '../../shared/GhostButton';
import StyledSvg from '../../shared/styled-svg';
import BookmarkIcon from '../../svg/Bookmark';
import MediaContext from '../../../contexts/MediaContext';

interface IProps {
  time: number;
  onClick(time: number): void;
}

const FilteredSvg = styled(StyledSvg)`
  filter: url('#aip-filter-dropshadow');
`;

function BookmarkButton(props: IProps) {
  const [media] = useContext(MediaContext);

  return (
    <GhostButton
      onClick={() => {
        media.currentTime = props.time;
        props.onClick(props.time);
      }}
    >
      <FilteredSvg as={BookmarkIcon} />
    </GhostButton>
  );
}

export default BookmarkButton;
