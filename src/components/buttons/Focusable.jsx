import { Component } from 'react';

export default class Focusable extends Component {
  isFocused = false;

  render() {
    return null;
  }

  onFocus = () => {
    this.setState({ isFocused: true });
  };

  onBlur = () => {
    this.setState({ isFocused: false });
  };
}
