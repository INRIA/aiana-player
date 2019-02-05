import classNames from 'classnames';
import * as React from 'react';
import { Direction } from '../../../types';
import styled from '../../../utils/styled-components';
import StyledButton from '../../styled/StyledButton';

interface IProps {
  directions: Direction[];
  type: 'border' | 'corner';
  mouseDownHandler(x: number, y: number, directions: Direction[]): void;
}

const StyledResizeButton = styled(StyledButton)`
  position: absolute;
  /* background-color: ${(props) => props.theme.fg}; */
  background-color: red;

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

  &.border {
    &.top,
    &.bottom {
      left: 1rem;
      height: .5rem;
      width: calc(100% - 2rem);
      cursor: ns-resize;
    }

    &.left,
    &.right {
      top: 1rem;
      height: calc(100% - 2rem);
      width: .5rem;
      cursor: ew-resize;
    }
  }

  &.corner {
    height: 1em;
    width: 1em;

    &.top.left, &.bottom.right {
      cursor: nwse-resize;
    }

    &.top.right, &.bottom.left {
      cursor: nesw-resize;
    }
  }

`;

class ResizeButton extends React.Component<IProps> {
  public static defaultProps = {
    type: 'border'
  };

  public render() {
    return (
      <StyledResizeButton
        className={classNames(this.props.type, this.props.directions)}
        onMouseDown={this.mouseDownHandler}
      />
    );
  }

  private mouseDownHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    this.props.mouseDownHandler(evt.pageX, evt.pageY, [
      ...this.props.directions
    ]);
  };
}

export default ResizeButton;
