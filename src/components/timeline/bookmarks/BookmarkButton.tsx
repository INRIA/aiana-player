import * as React from 'react';
import StyledButton from 'src/components/styled/StyledButton';
import StyledSvg from 'src/components/styled/StyledSvg';
import BookmarkIcon from 'src/components/svg/Bookmark';
import styled from 'src/utils/styled-components';

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
  public render() {
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
