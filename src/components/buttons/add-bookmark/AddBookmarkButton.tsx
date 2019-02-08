import * as React from 'react';
import { I18nContextValues, withI18n } from 'react-i18next';
import { connect } from 'react-redux';
import { addBookmark } from '../../../actions/bookmarks';
import AssistiveText from '../../../components/a11y/AssistiveText';
import StyledButton from '../../../components/styled/StyledButton';
import { IAianaState } from '../../../reducers';
import ControlIcon from './ControlIcon';

interface IStateProps {
  currentTime: number;
}

interface IDispatchProps {
  addBookmark(time: number): void;
}

interface IAddBookmarkButton
  extends IStateProps,
    IDispatchProps,
    I18nContextValues {}

class AddBookmarkButton extends React.Component<IAddBookmarkButton> {
  render() {
    return (
      <StyledButton onClick={this.clickHandler}>
        <ControlIcon aria-hidden="true" />
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
)(withI18n()(AddBookmarkButton));
