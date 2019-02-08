import * as React from 'react';
import styled from '../../../utils/styled-components';
import StyledButton from '../../styled/StyledButton';
import StyledSvg from '../../styled/StyledSvg';
import BookmarkIcon from '../../svg/Bookmark';

const StyledSvgIcon = StyledSvg.withComponent(BookmarkIcon);
const StyledBookmarkIcon = styled(StyledSvgIcon)`
  filter: url('#aip-filter-dropshadow');
`;

interface IProps {
  media?: HTMLMediaElement;
  time: number;
  onClick(media: HTMLMediaElement, time: number): void;
}

class BookmarkButton extends React.Component<IProps> {
  render() {
    return (
      <StyledButton onClick={this.clickHandler}>
        <StyledBookmarkIcon />
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

export default BookmarkButton;
