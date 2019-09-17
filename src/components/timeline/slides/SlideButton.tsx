import React, { useContext } from 'react';
import styled from '../../../utils/styled-components';
import GhostButton from '../../shared/GhostButton';
import StyledSvg from '../../shared/SvgIcon';
import SlideIcon from '../../svg/Slide';
import MediaContext from '../../../contexts/MediaContext';

interface IProps {
  label: string;
  time: number;
  onClick(time: number): void;
}

const FilteredSvg = styled(StyledSvg)`
  filter: url('#aip-filter-dropshadow');
`;

function SlideButton(props: IProps) {
  const [media] = useContext(MediaContext);

  return (
    <GhostButton
      aria-label={props.label}
      onClick={() => {
        media.currentTime = props.time;
        props.onClick(props.time);
      }}
    >
      <FilteredSvg as={SlideIcon} />
    </GhostButton>
  );
}

export default SlideButton;
