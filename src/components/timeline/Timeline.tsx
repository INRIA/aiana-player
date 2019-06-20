import React from 'react';
import { hexToHsla } from '../../utils/colors';
import styled from '../../utils/styled-components';
import BookmarksBar from './bookmarks/BookmarksBar';
import ChaptersBar from './chapters/ChaptersBar';
import SlidesBar from './slides/SlidesBar';

interface IProps {
  display?: boolean;
}

const StyledTimelineBar = styled.div`
  height: 2.25em;
  padding: 0 1em;

  position: relative;

  background-color: ${(props) => hexToHsla(props.theme.bg, 0.9)};
  transition: none;

  &.inactive {
    opacity: 0;
    transition: opacity 0.1s linear;
  }

  > div {
    width: 100%;
    height: 100%;
    position: relative;
  }
`;

function TimelineBar(props: IProps) {
  if (!props.display) {
    return null;
  }

  return (
    <StyledTimelineBar className="aip-content-timeline">
      <div>
        <ChaptersBar />
        <BookmarksBar />
        <SlidesBar />
      </div>
    </StyledTimelineBar>
  );
}

export default TimelineBar;
