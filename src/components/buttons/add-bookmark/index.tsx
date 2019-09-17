import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { addBookmark } from '../../../actions/bookmarks';
import { IAianaState } from '../../../reducers';
import AssistiveText from '../../a11y/AssistiveText';
import GhostButton from '../../shared/GhostButton';
import StyledSvg from '../../shared/styled-svg';
import BookmarkAddIcon from '../../svg/BookmarkAdd';

interface IStateProps {
  currentTime: number;
}

interface IDispatchProps {
  addBookmark(time: number): void;
}

interface IAddBookmarkButton extends IStateProps, IDispatchProps {}

function AddBookmarkButton(props: IAddBookmarkButton) {
  const [t] = useTranslation();

  return (
    <GhostButton
      onClick={() => {
        props.addBookmark(props.currentTime);
      }}
    >
      <StyledSvg as={BookmarkAddIcon} aria-hidden="true" />
      <AssistiveText>{t('controls.add_bookmark')}</AssistiveText>
    </GhostButton>
  );
}

function mapState(state: IAianaState) {
  return {
    currentTime: state.player.currentTime
  };
}

const mapDispatch = {
  addBookmark
};

export default connect(
  mapState,
  mapDispatch
)(AddBookmarkButton);
