import * as React from 'react';
import StyledButton from 'src/components/styled/StyledButton';
import StyledSvg from 'src/components/styled/StyledSvg';
import SlideIcon from 'src/components/svg/Slide';
import styled from 'src/utils/styled-components';

const StyledSvgIcon = StyledSvg.withComponent(SlideIcon);
const StyledSlideIcon = styled(StyledSvgIcon)`
  filter: url('#aip-filter-dropshadow');
`;

interface IProps {
  media?: HTMLMediaElement;
  onClick: (media: HTMLMediaElement, time: number) => void;
  time: number;
}

class SlideButton extends React.Component<IProps> {
  public render() {
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
