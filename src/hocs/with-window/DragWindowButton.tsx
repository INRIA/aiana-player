import classNames from 'classnames';
import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import StyledButton from '../../components/styled/StyledButton';
import StyledSvg from '../../components/styled/StyledSvg';
import Move from '../../components/svg/Move';
import { ESCAPE_KEY } from '../../constants';
import { hexToHsla } from '../../utils/colors';
import styled from '../../utils/styled-components';

const StyledSvgIcon = StyledSvg.withComponent(Move);

const StyledDragWindowButton = styled(StyledButton)`
  display: block;

  height: 1.5rem;
  width: 50%;

  position: absolute;
  top: 0;
  left: 25%;

  /* video doesn't want button to be displayed over it, unless a z-index is set */
  z-index: 1;

  opacity: 0;
  background-color: transparent;

  &.activable:hover,
  &.is-dragging,
  &.focus-visible {
    opacity: 1;
  }

  &.focus-visible {
    width: 100%;
    height: 100%;

    left: 0;
    background-color: ${(props) => hexToHsla(props.theme.fg, 0.65)};

    svg {
      fill: ${(props) => props.theme.bg};
    }
  }

  svg {
    fill: ${(props) => props.theme.bg};
  }

  &:not([aria-disabled='true']):not([disabled]):not([aria-hidden='true']) {
    cursor: grab;
  }
`;

interface IProps {
  isDraggable: boolean;
  windowId: string;
  dragEnd(): void;
  dragStart(): void;
  dragUpdate(deltaX: number, deltaY: number): void;
  keyUpdate(key: string): void;
}

interface IDragWindowButton extends IProps, WithTranslation {}

interface IState {
  isDragging: boolean;
}

const defaultState: IState = {
  isDragging: false
};

class DragWindowButton extends React.Component<IDragWindowButton, IState> {
  controlsRef = React.createRef<HTMLButtonElement>();
  baseX = 0;
  baseY = 0;

  state = defaultState;

  render() {
    const classes = classNames('draggable-control', {
      activable: this.props.isDraggable,
      'is-dragging': this.state.isDragging
    });

    return (
      <StyledDragWindowButton
        aria-label={this.props.t('window.drag', {
          windowId: this.props.windowId
        })}
        className={classes}
        innerRef={this.controlsRef}
        onMouseDown={this.mouseDownHandler}
        onKeyDown={this.keyDownHandler}
      >
        <StyledSvgIcon aria-hidden="true" />
      </StyledDragWindowButton>
    );
  }

  private mouseDownHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    evt.currentTarget.focus();
    this.setState({ isDragging: true });

    this.baseX = evt.pageX;
    this.baseY = evt.pageY;

    document.addEventListener('mousemove', this.mouseMoveHandler);
    document.addEventListener('mouseup', this.mouseUpHandler);

    this.props.dragStart();
  };

  private mouseMoveHandler = (evt: MouseEvent) => {
    const deltaX = evt.pageX - this.baseX;
    const deltaY = evt.pageY - this.baseY;

    this.props.dragUpdate(deltaX, deltaY);
  };

  private mouseUpHandler = () => {
    this.controlsRef.current!.blur();
    this.interactionEnd();
  };

  private keyDownHandler = (evt: React.KeyboardEvent<HTMLButtonElement>) => {
    if (evt.key === ESCAPE_KEY) {
      evt.currentTarget.blur();
      this.interactionEnd();
    } else {
      this.props.keyUpdate(evt.key);
    }
  };

  private interactionEnd() {
    document.removeEventListener('mousemove', this.mouseMoveHandler);
    document.removeEventListener('mouseup', this.mouseUpHandler);

    this.setState({ isDragging: false });

    this.props.dragEnd();
  }
}

export default withTranslation()(DragWindowButton);
