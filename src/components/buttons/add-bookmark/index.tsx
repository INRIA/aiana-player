import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { addBookmark } from '../../../actions/bookmarks';
import { IAianaState } from '../../../reducers';
import AssistiveText from '../../a11y/AssistiveText';
import StyledButton from '../../shared/styled-button';
import StyledSvg from '../../shared/styled-svg';
import BookmarkAddIcon from '../../svg/BookmarkAdd';

interface IStateProps {
  currentTime: number;
}

interface IDispatchProps {
  addBookmark(time: number): void;
}

interface IAddBookmarkButton
  extends IStateProps,
    IDispatchProps,
    WithTranslation {}

class AddBookmarkButton extends React.Component<IAddBookmarkButton> {
  render() {
    return (
      <StyledButton type="button" onClick={this.clickHandler}>
        <StyledSvg as={BookmarkAddIcon} aria-hidden="true" />
        <AssistiveText>{this.props.t('controls.add_bookmark')}</AssistiveText>
      </StyledButton>
    );
  }

  private clickHandler = () => {
    this.props.addBookmark(this.props.currentTime);
  };
}

function mapStateToProps(state: IAianaState) {
  return {
    currentTime: state.player.currentTime
  };
}

const mapDispatchToProps = {
  addBookmark
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(AddBookmarkButton));
