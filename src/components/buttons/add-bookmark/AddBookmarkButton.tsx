import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { addBookmark } from 'src/actions/bookmarks';
import AssistiveText from 'src/components/a11y/AssistiveText';
import StyledButton from 'src/components/styled/StyledButton';
import { IAianaState } from 'src/reducers';
import ControlIcon from './ControlIcon';

interface IStateProps {
  currentTime: number;
}

interface IDispatchProps {
  addBookmark: (time: number) => void;
}

interface IAddBookmarkButton
  extends IStateProps,
    IDispatchProps,
    InjectedTranslateProps {}

class AddBookmarkButton extends React.Component<IAddBookmarkButton> {
  public render() {
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

const mapStateToProps = (state: IAianaState) => ({
  currentTime: state.player.currentTime
});

const mapDispatchToProps = {
  addBookmark
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate()(AddBookmarkButton));
