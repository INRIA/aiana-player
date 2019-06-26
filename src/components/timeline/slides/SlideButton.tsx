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

class SlideButton extends React.Component<IProps> {
  render() {
    return (
      <GhostButton
        aria-label={this.props.label}
        onClick={this.clickHandler}
        type="button"
      >
        <FilteredSvg as={SlideIcon} aria-hidden="true" />
      </GhostButton>
    );
  }

  clickHandler = () => {
    this.props.onClick(this.props.mediaSelector, this.props.time);
  };
}

export default SlideButton;
