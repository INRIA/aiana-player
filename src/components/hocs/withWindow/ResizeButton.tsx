import classNames from 'classnames';
import React from 'react';
import { ESCAPE_KEY } from '../../../constants';
import { Direction } from '../../../types';
import styled from '../../../utils/styled-components';
import StyledButton from '../../styled/StyledButton';

interface IProps {
  handlePositions: Direction[];
  label: string;
  type: 'border' | 'corner';
  keyDownHandler(key: string, handlePositions: Direction[]): void;
  mouseDownHandler(x: number, y: number, handlePositions: Direction[]): void;
}

const OUTER_OVERFLOW_SIZE = '4px';
const FOCUSED_OUTER_OVERFLOW_SIZE = '0.75rem';
const FOCUSED_SIZE = '1.5rem';
const CORNER_SIZE = '1rem';

const StyledResizeButton = styled(StyledButton)`
  position: absolute;

  &.top {
    top: -${OUTER_OVERFLOW_SIZE};

    &.focus-visible {
      top: -${FOCUSED_OUTER_OVERFLOW_SIZE};
    }
  }

  &.bottom {
    bottom: -${OUTER_OVERFLOW_SIZE};

    &.focus-visible {
      bottom: -${FOCUSED_OUTER_OVERFLOW_SIZE};
    }
  }

  &.left {
    left: -${OUTER_OVERFLOW_SIZE};

    &.focus-visible {
      left: -${FOCUSED_OUTER_OVERFLOW_SIZE};
    }
  }

  &.right {
    right: -${OUTER_OVERFLOW_SIZE};

    &.focus-visible {
      right: -${FOCUSED_OUTER_OVERFLOW_SIZE};
    }
  }

  &.border {
    &.top,
    &.bottom {
      left: 1rem;
      height: calc(0.5rem + ${OUTER_OVERFLOW_SIZE});
      width: calc(100% - 2rem);

      &:not([aria-disabled='true']):not([disabled]):not([aria-hidden='true']) {
        cursor: ns-resize;
      }

      &.focus-visible {
        height: ${FOCUSED_SIZE};
      }
    }

    &.left,
    &.right {
      top: 1rem;
      height: calc(100% - 2rem);
      width: calc(0.5rem + ${OUTER_OVERFLOW_SIZE});

      &:not([aria-disabled='true']):not([disabled]):not([aria-hidden='true']) {
        cursor: ew-resize;
      }

      &.focus-visible {
        width: ${FOCUSED_SIZE};
      }
    }
  }

  &.corner {
    height: calc(${CORNER_SIZE} + ${OUTER_OVERFLOW_SIZE});
    width: calc(${CORNER_SIZE} + ${OUTER_OVERFLOW_SIZE});

    &.focus-visible {
      height: ${FOCUSED_SIZE};
      width: ${FOCUSED_SIZE};
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
  static defaultProps: Partial<IProps> = {
    type: 'border'
  };

  render() {
    return (
      <StyledResizeButton
        aria-label={this.props.label}
        className={classNames(this.props.type, this.props.handlePositions)}
        onKeyDown={this.keyDownHandler}
        onMouseDown={this.mouseDownHandler}
        tabIndex={this.props.type === 'border' ? -1 : undefined}
      >
        {this.props.children}
      </StyledResizeButton>
    );
  }

  private keyDownHandler = (evt: React.KeyboardEvent<HTMLButtonElement>) => {
    if (evt.key === ESCAPE_KEY) {
      evt.currentTarget.blur();
    }
    this.props.keyDownHandler(evt.key, [...this.props.handlePositions]);
  };

  private mouseDownHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    this.props.mouseDownHandler(evt.pageX, evt.pageY, [
      ...this.props.handlePositions
    ]);
  };
}

export default ResizeButton;
