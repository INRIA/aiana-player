import classNames from 'classnames';
import React, { Component, createRef } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import GhostButton from '../../components/shared/GhostButton';
import StyledSvg from '../../components/shared/styled-svg';
import MoveIcon from '../../components/svg/Move';
import { ESCAPE_KEY } from '../../constants/keys';
import styled from '../../utils/styled-components';

interface IProps {
  isDraggable: boolean;
  widgetName: string;
  dragEnd(): void;
  dragStart(): void;
  dragUpdate(deltaX: number, deltaY: number): void;
  keyUpdate(key: string): void;
}

interface IDragWidgetButton extends IProps, WithTranslation {}

interface IState {
  isDragging: boolean;
}

const StyledDragWidgetButton = styled(GhostButton)`
  display: block;

  height: 1.5em;
  width: 100%;

  position: absolute;
  left: 0;

  svg {
    fill: ${(props) => props.theme.bg};
  }

  &:not([aria-disabled='true']):not([disabled]):not([aria-hidden='true']) {
    cursor: grab;
  }
`;

const defaultState: IState = {
  isDragging: false
};

class DragWidgetButton extends Component<IDragWidgetButton, IState> {
  controlsRef = createRef<HTMLButtonElement>();
  baseX = 0;
  baseY = 0;

  readonly state = defaultState;

  render() {
    const classes = classNames('aip-widget-drag', {
      activable: this.props.isDraggable,
      'is-dragging': this.state.isDragging
    });

    return (
      <StyledDragWidgetButton
        aria-label={this.props.t('widget.drag', {
          widgetName: this.props.widgetName
        })}
        className={classes}
        ref={this.controlsRef}
        onMouseDown={this.mouseDownHandler}
        onKeyDown={this.keyDownHandler}
        type="button"
      >
        <StyledSvg as={MoveIcon} aria-hidden="true" />
      </StyledDragWidgetButton>
    );
  }

  mouseDownHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    evt.currentTarget.focus();
    this.setState({ isDragging: true });

    this.baseX = evt.pageX;
    this.baseY = evt.pageY;

    document.addEventListener('mousemove', this.mouseMoveHandler);
    document.addEventListener('mouseup', this.mouseUpHandler);

    this.props.dragStart();
  };

  mouseMoveHandler = (evt: MouseEvent) => {
    const deltaX = evt.pageX - this.baseX;
    const deltaY = evt.pageY - this.baseY;

    this.props.dragUpdate(deltaX, deltaY);
  };

  mouseUpHandler = () => {
    this.controlsRef.current!.blur();
    this.interactionEnd();
  };

  keyDownHandler = (evt: React.KeyboardEvent<HTMLButtonElement>) => {
    if (evt.key === ESCAPE_KEY) {
      evt.currentTarget.blur();
      this.interactionEnd();
    } else {
      this.props.keyUpdate(evt.key);
    }
  };

  interactionEnd() {
    document.removeEventListener('mousemove', this.mouseMoveHandler);
    document.removeEventListener('mouseup', this.mouseUpHandler);

    this.setState({ isDragging: false });

    this.props.dragEnd();
  }
}

export default withTranslation()(DragWidgetButton);
