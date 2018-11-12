import * as React from 'react';
import styled from 'src/utils/styled-components';
import BookmarksBar from './bookmarks/BookmarksBar';

const StyledTimelineBar = styled.div`
  width: 100%;
  height: 1em;

  background-color: ${(props) => props.theme.bg};
`;

const TimelineBar = () => (
  <StyledTimelineBar className="aip-content-timeline">
    <BookmarksBar />
  </StyledTimelineBar>
);

export default TimelineBar;
