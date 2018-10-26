import * as React from 'react';
import { connect } from 'react-redux';
import { addBookmark } from 'src/actions/bookmarks';
import StyledButton from 'src/components/styled/StyledButton';
import { IAianaState } from 'src/reducers';
import ControlIcon from './ControlIcon';

interface IProps {
  currentTime: number;
}

interface IDispatchProps {
  addBookmark: (time: number) => void;
}

interface IAddBookmarkButton extends IProps, IDispatchProps {}

class AddBookmarkButton extends React.Component<IAddBookmarkButton> {
  public render() {
    return (
      <StyledButton onClick={this.clickHandler}>
        <ControlIcon />
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
)(AddBookmarkButton);
