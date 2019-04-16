import React from 'react';
import { connect } from 'react-redux';
import { requestSeek } from '../../../actions/player';
import { IAianaState } from '../../../reducers';
import { IBookmark } from '../../../reducers/bookmarks';
import { unitToPercent } from '../../../utils/math';
import styled from '../../../utils/styled-components';
import BookmarkButton from './BookmarkButton';

interface IStateProps {
  bookmarks: IBookmark[];
  duration: number;
  media?: HTMLMediaElement;
}

interface IDispatchProps {
  requestSeek: any;
}

interface IBookmarksBar extends IStateProps, IDispatchProps {}

const StyledBookmarksBar = styled.nav`
  width: 100%;
  height: 50%;

  position: absolute;
  left: 0;
  top: 0;

  ol {
    margin: 0;
    padding: 0;

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  li {
    display: block;
    width: 1.125em;
    height: 1.125em;

    line-height: 1;

    position: absolute;
    transform: translateX(-50%);
    list-style: none;

    button {
      width: 100%;
      height: 100%;
    }
  }
`;

function BookmarksBar({
  bookmarks,
  duration,
  media,
  requestSeek: requestSeekAction
}: IBookmarksBar) {
  return (
    <StyledBookmarksBar>
      <ol>
        {bookmarks.map(({ time }, idx) => (
          <li
            key={idx}
            style={{
              left: `${unitToPercent(time, duration)}%`
            }}
          >
            <BookmarkButton
              onClick={requestSeekAction}
              media={media}
              time={time}
            />
          </li>
        ))}
      </ol>
    </StyledBookmarksBar>
  );
}

function mapState(state: IAianaState) {
  return {
    bookmarks: state.bookmarks,
    duration: state.player.duration,
    media: state.player.mediaElement
  };
}

const mapDispatch = {
  requestSeek
};

export default connect(
  mapState,
  mapDispatch
)(BookmarksBar);
