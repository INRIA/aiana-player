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

// TODO: use variables for sizes.
const StyledResizeButton = styled(StyledButton)`
  position: absolute;

  &.top {
    top: -4px;

    &.focus-visible {
      top: -0.75rem;
    }
  }

  &.bottom {
    bottom: -4px;

    &.focus-visible {
      bottom: -0.75rem;
    }
  }

  &.left {
    left: -4px;

    &.focus-visible {
      left: -0.75rem;
    }
  }

  &.right {
    right: -4px;

    &.focus-visible {
      right: -0.75rem;
    }
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

      &.focus-visible {
        height: 1.5rem;
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

      &.focus-visible {
        width: 1.5rem;
      }
    }
  }

  &.corner {
    height: calc(1rem + 4px);
    width: calc(1rem + 4px);

    &.focus-visible {
      height: 1.5rem;
      width: 1.5rem;
    }

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

  svg {
    display: none;
  }
`;

class ResizeButton extends React.Component<IProps> {
  static defaultProps = {
    type: 'border'
  };

  render() {
    return (
      <StyledResizeButton
        className={classNames(this.props.type, this.props.directions)}
        onMouseDown={this.mouseDownHandler}
      >
        {this.props.children}
      </StyledResizeButton>
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
