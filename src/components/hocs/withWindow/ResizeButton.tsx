import * as React from 'react';
import { Direction } from '../../../constants';
import styled from '../../../utils/styled-components';
import StyledButton from '../../styled/StyledButton';

interface IProps {
  direction: Direction;
  mouseDownHandler(x: number, y: number, direction: Direction): void;
}

const StyledResizeButton = styled(StyledButton)`
  position: absolute;
  /* background-color: ${(props) => props.theme.fg}; */
  background-color: red;

  &.top,
  &.bottom {
    cursor: ns-resize;
    height: 4px;
    left: 1em;
    width: calc(100% - 2em);
  }

  &.left,
  &.right {
    cursor: ew-resize;
    height: calc(100% - 2em);
    top: 1em;
    width: 4px;
  }

  &.top {
    top: 0;
  }

  &.bottom {
    bottom: 0;
  }

  &.left {
    left: 0;
  }

  &.right {
    right: 0;
  }
`;

class ResizeButton extends React.Component<IProps> {
  public render() {
    return (
      <StyledResizeButton
        className={this.props.direction}
        onMouseDown={this.mouseDownHandler}
      />
    );
  }

  private mouseDownHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    this.props.mouseDownHandler(evt.pageX, evt.pageY, this.props.direction);
  };
}

export default ResizeButton;
