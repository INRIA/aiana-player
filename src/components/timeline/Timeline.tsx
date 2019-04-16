import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers';
import { hexToHsla } from '../../utils/colors';
import styled from '../../utils/styled-components';
import BookmarksBar from './bookmarks/BookmarksBar';
import ChaptersBar from './chapters/ChaptersBar';
import SlidesBar from './slides/SlidesBar';

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

interface IStateProps {
  isActive: boolean;
}

function TimelineBar(props: IStateProps) {
  return (
    <StyledTimelineBar
      className={classNames({
        'aip-content-timeline': true,
        inactive: !props.isActive
      })}
    >
      <div>
        <ChaptersBar />
        <BookmarksBar />
        <SlidesBar />
      </div>
    </StyledTimelineBar>
  );
}

function mapState(state: IAianaState) {
  return {
    isActive: state.preferences.isActive
  };
}

export default connect(mapState)(TimelineBar);
