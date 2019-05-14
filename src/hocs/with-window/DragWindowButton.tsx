import classNames from 'classnames';
import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import StyledButton from '../../components/shared/styled-button';
import StyledSvg from '../../components/shared/styled-svg';
import MoveIcon from '../../components/svg/Move';
import { ESCAPE_KEY } from '../../constants';
import styled from '../../utils/styled-components';

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

const StyledDragWindowButton = styled(StyledButton)`
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

class DragWindowButton extends React.Component<IDragWindowButton, IState> {
  controlsRef = React.createRef<HTMLButtonElement>();
  baseX = 0;
  baseY = 0;

  readonly state = defaultState;

  render() {
    const classes = classNames('aip-window-drag', {
      activable: this.props.isDraggable,
      'is-dragging': this.state.isDragging
    });

    return (
      <StyledDragWindowButton
        aria-label={this.props.t('window.drag', {
          windowId: this.props.windowId
        })}
        className={classes}
        ref={this.controlsRef}
        onMouseDown={this.mouseDownHandler}
        onKeyDown={this.keyDownHandler}
        type="button"
      >
        <StyledSvg as={MoveIcon} aria-hidden="true" />
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
