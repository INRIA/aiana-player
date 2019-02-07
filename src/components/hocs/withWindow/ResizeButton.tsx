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

  &.top {
    top: -4px;
  }

  &.bottom {
    bottom: -4px;
  }

  &.left {
    left: -4px;
  }

  &.right {
    right: -4px;
  }

  &.border {
    &.top,
    &.bottom {
      left: 1rem;
      height: calc(0.5rem + 4px);
      width: calc(100% - 2rem);
      &:not([aria-disabled='true']):not([disabled]):not([aria-hidden='true']) {
        cursor: ns-resize;
      }
    }

    &.left,
    &.right {
      top: 1rem;
      height: calc(100% - 2rem);
      width: calc(0.5rem + 4px);
      &:not([aria-disabled='true']):not([disabled]):not([aria-hidden='true']) {
        cursor: ew-resize;
      }
    }
  }

  &.corner {
    height: calc(1rem + 4px);
    width: calc(1rem + 4px);

    &.top.left,
    &.bottom.right {
      &:not([aria-disabled='true']):not([disabled]):not([aria-hidden='true']) {
        cursor: nwse-resize;
      }
    }

    &.top.right,
    &.bottom.left {
      &:not([aria-disabled='true']):not([disabled]):not([aria-hidden='true']) {
        cursor: nesw-resize;
      }
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
