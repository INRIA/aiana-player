import React from 'react';
import styled from '../../../utils/styled-components';
import GhostButton from '../../shared/GhostButton';
import StyledSvg from '../../shared/styled-svg';
import SlideIcon from '../../svg/Slide';

interface IProps {
  label: string;
  mediaSelector: string;
  time: number;
  onClick(mediaSelector: string, time: number): void;
}

const FilteredSvg = styled(StyledSvg)`
  filter: url('#aip-filter-dropshadow');
`;

function SlideButton(props: IProps) {
  return (
    <GhostButton
      aria-label={props.label}
      onClick={() => props.onClick(props.mediaSelector, props.time)}
      type="button"
    >
      <FilteredSvg as={SlideIcon} aria-hidden="true" />
    </GhostButton>
  );
}

export default SlideButton;
