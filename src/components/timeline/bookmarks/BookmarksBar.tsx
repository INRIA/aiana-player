import * as React from 'react';
import { connect } from 'react-redux';
import { requestSeek } from 'src/actions/player';
import { IAianaState } from 'src/reducers';
import { IBookmark } from 'src/reducers/bookmarks';
import { unitToPercent } from 'src/utils/math';
import styled from 'src/utils/styled-components';
import BookmarkButton from './BookmarkButton';

interface IStateProps {
  bookmarks: IBookmark[];
  duration: number;
  media?: HTMLMediaElement;
}

interface IDispatchProps {
  requestSeek(media: HTMLMediaElement, seekingTime: number): any;
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

const BookmarksBar: React.SFC<IBookmarksBar> = ({
  bookmarks,
  duration,
  media,
  requestSeek: requestSeekAction
}) => (
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

const mapStateToProps = (state: IAianaState) => ({
  bookmarks: state.bookmarks,
  duration: state.player.duration,
  media: state.player.mediaElement
});

const mapDispatchToProps = {
  requestSeek
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookmarksBar);
