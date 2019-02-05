import * as React from 'react';
import styled from '../../../utils/styled-components';
import StyledButton from '../../styled/StyledButton';
import StyledSvg from '../../styled/StyledSvg';
import Move from '../../svg/Move';

const StyledSvgIcon = StyledSvg.withComponent(Move);

const StyledDragButton = styled(StyledButton)`
  display: block;
  height: 1.5rem;
  width: 100%;

  background-color: ${(props) => props.theme.fg};
  svg {
    fill: ${(props) => props.theme.bg};
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

class DragButton extends React.Component<IProps> {
  public controlsRef = React.createRef<HTMLButtonElement>();
  public baseX = 0;
  public baseY = 0;
  public render() {
    return (
      <StyledDragButton
        className="draggable-control"
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

    this.controlsRef.current!.blur();

    this.props.dragEnd();
  };

  private keyDownHandler = (evt: React.KeyboardEvent<HTMLButtonElement>) => {
    this.props.keyUpdate(evt.key);
  };
}

export default DragButton;
