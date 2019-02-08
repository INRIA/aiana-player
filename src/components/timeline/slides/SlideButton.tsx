import React from 'react';
import styled from '../../../utils/styled-components';
import StyledButton from '../../styled/StyledButton';
import StyledSvg from '../../styled/StyledSvg';
import SlideIcon from '../../svg/Slide';

const StyledSvgIcon = StyledSvg.withComponent(SlideIcon);
const StyledSlideIcon = styled(StyledSvgIcon)`
  filter: url('#aip-filter-dropshadow');
`;

interface IProps {
  media?: HTMLMediaElement;
  time: number;
  onClick(media: HTMLMediaElement, time: number): void;
}

class SlideButton extends React.Component<IProps> {
  render() {
    return (
      <StyledButton onClick={this.clickHandler}>
        <StyledSlideIcon />
      </StyledButton>
    );
  }

  private clickHandler = () => {
    const { onClick, media, time } = this.props;
    if (!media) {
      return;
    }
    onClick(media, time);
  };
}

export default SlideButton;
