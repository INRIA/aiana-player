import classNames from 'classnames';
import React from 'react';
import { ESCAPE_KEY } from '../../../constants';
import { hexToHsla } from '../../../utils/colors';
import styled from '../../../utils/styled-components';
import StyledButton from '../../styled/StyledButton';
import StyledSvg from '../../styled/StyledSvg';
import Move from '../../svg/Move';

const StyledSvgIcon = StyledSvg.withComponent(Move);

const StyledDragButton = styled(StyledButton)`
  display: block;

  height: 1.5rem;
  width: 100%;

  position: absolute;
  top: 0;
  /* video doesn't want button to be displayed over it, unless a z-index is set */
  z-index: 1;

  opacity: 0;
  background-color: ${(props) => hexToHsla(props.theme.bg, 0.75)};

  &:hover,
  &.is-dragging,
  &.focus-visible {
    opacity: 1;
  }

  &.focus-visible {
    height: 100%;
  }

  svg {
    fill: ${(props) => props.theme.fg};
  }

  &:not([aria-disabled='true']):not([disabled]):not([aria-hidden='true']) {
    cursor: grab;
  }
`;

interface IProps {
  dragEnd(): void;
  dragStart(): void;
  dragUpdate(xDiff: number, yDiff: number): void;
  keyUpdate(key: string): void;
}

interface IState {
  isDragging: boolean;
}

class DragButton extends React.Component<IProps, IState> {
  controlsRef = React.createRef<HTMLButtonElement>();
  baseX = 0;
  baseY = 0;

  state = {
    isDragging: false
  };

  render() {
    const classes = classNames('draggable-control', {
      'is-dragging': this.state.isDragging
    });

    return (
      <StyledDragButton
        className={classes}
        innerRef={this.controlsRef}
        onMouseDown={this.mouseDownHandler}
        onKeyDown={this.keyDownHandler}
      >
        <StyledSvgIcon />
      </StyledDragButton>
    );
  }

  private mouseDownHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    this.controlsRef.current!.focus();
    this.setState({ isDragging: true });

    this.baseX = evt.pageX;
    this.baseY = evt.pageY;

    document.addEventListener('mousemove', this.mouseMoveHandler, true);
    document.addEventListener('mouseup', this.mouseUpHandler, true);

    this.props.dragStart();
  };

  private mouseMoveHandler = (evt: MouseEvent) => {
    const xDiff = evt.pageX - this.baseX;
    const yDiff = evt.pageY - this.baseY;

    this.props.dragUpdate(xDiff, yDiff);
  };

  private mouseUpHandler = () => {
    document.removeEventListener('mousemove', this.mouseMoveHandler, true);
    document.removeEventListener('mouseup', this.mouseUpHandler, true);

    this.setState({ isDragging: false });
    this.controlsRef.current!.blur();

    this.props.dragEnd();
  };

  private keyDownHandler = (evt: React.KeyboardEvent<HTMLButtonElement>) => {
    if (evt.key === ESCAPE_KEY) {
      this.mouseUpHandler();
    }
    this.props.keyUpdate(evt.key);
  };
}

export default DragButton;
