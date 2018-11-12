import * as React from 'react';
import BookmarkAddIcon from 'src/components/buttons/add-bookmark/ControlIcon';
import StyledButton from 'src/components/styled/StyledButton';

interface IProps {
  media: HTMLMediaElement | null;
  onClick: (media: HTMLMediaElement, time: number) => void;
  time: number;
}

class BookmarkAddButton extends React.Component<IProps> {
  public render() {
    return (
      <StyledButton onClick={this.clickHandler}>
        <BookmarkAddIcon />
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

export default BookmarkAddButton;
