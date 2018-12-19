import classNames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { IAianaState } from '../../reducers';
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

  background-color: ${(props) => hexToHsla(props.theme.bg, 0.9)};

  &.inactive {
    opacity: 0;
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

function mapStateToProps(state: IAianaState) {
  return {
    isActive: state.preferences.isActive
  };
}

export default connect(mapStateToProps)(TimelineBar);
