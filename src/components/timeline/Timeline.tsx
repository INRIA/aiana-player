import * as React from 'react';
import styled from 'src/utils/styled-components';
import BookmarksBar from './bookmarks/BookmarksBar';
import ChaptersBar from './chapters/ChaptersBar';

const StyledTimelineBar = styled.div`
  width: 100%;
  height: 1em;
  padding: 0 1em;

  position: absolute;
  bottom: 4.25em;

  background-color: ${(props) => props.theme.bg};

  > div {
    width: 100%;
    height: 100%;
    position: relative;

    > * {
      width: 100%;
      height: 100%;

      position: absolute;
      top: 0;
      left: 0;
    }
  }
`;

const TimelineBar = () => (
  <StyledTimelineBar className="aip-content-timeline">
    <div>
      <ChaptersBar />
      <BookmarksBar />
    </div>
  </StyledTimelineBar>
);

export default TimelineBar;
