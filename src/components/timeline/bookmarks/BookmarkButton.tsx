import React from 'react';
import styled from '../../../utils/styled-components';
import StyledButton from '../../shared/styled-button';
import StyledSvg from '../../shared/styled-svg';
import BookmarkIcon from '../../svg/Bookmark';

interface IProps {
  media?: HTMLMediaElement;
  time: number;
  onClick(media: HTMLMediaElement, time: number): void;
}

const FilteredSvg = styled(StyledSvg)`
  filter: url('#aip-filter-dropshadow');
`;

class BookmarkButton extends React.Component<IProps> {
  render() {
    return (
      <StyledButton onClick={this.clickHandler} type="button">
        <FilteredSvg as={BookmarkIcon} />
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

export default BookmarkButton;
