import * as React from 'react';
import { hexToHsla } from '../../utils/colors';
import styled from '../../utils/styled-components';
import BookmarksBar from './bookmarks/BookmarksBar';
import ChaptersBar from './chapters/ChaptersBar';
import SlidesBar from './slides/SlidesBar';

const StyledTimelineBar = styled.div`
  width: 100%;
  height: 2.25em;
  padding: 0 1em;

  position: absolute;
  bottom: 4.25em;

  > div {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: ${(props) => hexToHsla(props.theme.fg, 0.1)};
  }
`;

const TimelineBar = () => (
  <StyledTimelineBar className="aip-content-timeline">
    <div>
      <ChaptersBar />
      <BookmarksBar />
      <SlidesBar />
    </div>
  </StyledTimelineBar>
);

export default TimelineBar;
