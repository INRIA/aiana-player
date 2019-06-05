import React from 'react';
import styled from '../../../utils/styled-components';
import StyledButton from '../../shared/styled-button';
import StyledSvg from '../../shared/styled-svg';
import SlideIcon from '../../svg/Slide';

interface IProps {
  label: string;
  media?: HTMLMediaElement;
  time: number;
  onClick(media: HTMLMediaElement, time: number): void;
}

const FilteredSvg = styled(StyledSvg)`
  filter: url('#aip-filter-dropshadow');
`;

class SlideButton extends React.Component<IProps> {
  render() {
    return (
      <StyledButton
        aria-label={this.props.label}
        onClick={this.clickHandler}
        type="button"
      >
        <FilteredSvg as={SlideIcon} aria-hidden="true" />
      </StyledButton>
    );
  }

  clickHandler = () => {
    const { onClick, media, time } = this.props;
    if (!media) {
      return;
    }
    onClick(media, time);
  };
}

export default SlideButton;
