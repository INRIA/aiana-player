import * as React from 'react';
import StyledButton from 'src/components/styled/StyledButton';
import StyledSvg from 'src/components/styled/StyledSvg';
import BookmarkIcon from 'src/components/svg/Bookmark';

const StyledBookmarkIcon = StyledSvg.withComponent(BookmarkIcon);

interface IProps {
  media?: HTMLMediaElement;
  onClick: (media: HTMLMediaElement, time: number) => void;
  time: number;
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
