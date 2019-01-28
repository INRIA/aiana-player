import * as React from 'react';
import { ExtendedHTMLElement } from '../../types';
import { unitToPercent } from '../../utils/math';
import styled from '../../utils/styled-components';
import { bounded } from '../../utils/ui';
import StyledButton from '../styled/StyledButton';
import StyledSvg from '../styled/StyledSvg';
import Move from '../svg/Move';

const StyledSvgIcon = StyledSvg.withComponent(Move);

const StyledControlsButton = styled(StyledButton)`
  position: absolute;
  top: 0;
  left: 0;

  display: block;
  height: 36px;
  width: 100%;

  background-color: rgba(200, 100, 100, 0.3);

  &:not([aria-disabled='true']):not([disabled]):not([aria-hidden='true']) {
    cursor: grab;
  }
`;

const StyledWindow = styled.div`
  position: absolute;

  background-color: ${(props) => props.theme.fg};
  /* debug */
  border: 2px solid #333;
`;

export interface IWindow {
  isDraggable: boolean;
}

interface IWrappedComponentProps {
  boundariesElement?: ExtendedHTMLElement;
  [prop: string]: any;
}

interface IHOCState {
  left: number;
  leftDiff: number;
  leftLowerBound: number;
  leftUpperBound: number;
  top: number;
  topDiff: number;
  topLowerBound: number;
  topUpperBound: number;
  width: number;
  height: number;
}

function withWindow(WrappedComponent: React.ComponentType<any>) {
  return class extends React.Component<IWrappedComponentProps, IHOCState> {
    public controlsRef = React.createRef<HTMLButtonElement>();
    public elementRef = React.createRef<HTMLDivElement>();
    public baseX = 0;
    public baseY = 0;

    public state = {
      height: 35,
      left: 0,
      leftDiff: 0,
      leftLowerBound: 0,
      leftUpperBound: 100,
      top: 0,
      topDiff: 0,
      topLowerBound: 0,
      topUpperBound: 100,
      width: 35
    };

    public render() {
      return (
        <StyledWindow
          className="draggable"
          innerRef={this.elementRef}
          style={{
            height: `${this.state.height}%`,
            left: `${bounded(
              this.state.left + this.state.leftDiff,
              0,
              this.state.leftUpperBound
            )}%`,
            top: `${bounded(
              this.state.top + this.state.topDiff,
              0,
              this.state.topUpperBound
            )}%`,
            width: `${this.state.width}%`
          }}
        >
          <StyledControlsButton
            className="draggable-control"
            innerRef={this.controlsRef}
            onMouseDown={this.dragStartHandler}
          >
            <StyledSvgIcon />
          </StyledControlsButton>

          <WrappedComponent {...this.props} />
        </StyledWindow>
      );
    }

    private dragStartHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
      evt.preventDefault();

      this.controlsRef.current!.focus();

      this.baseX = evt.pageX;
      this.baseY = evt.pageY;

      this.setUpperBounds();

      document.addEventListener('mousemove', this.dragHandler, true);
      document.addEventListener('mouseup', this.dragEndHandler, true);
    };

    private dragHandler = (evt: MouseEvent) => {
      this.updatePosition(evt.pageX, evt.pageY);
    };

    private dragEndHandler = () => {
      document.removeEventListener('mousemove', this.dragHandler, true);
      document.removeEventListener('mouseup', this.dragEndHandler, true);

      this.setState({
        left: this.boundedLeftPosition(this.state.left + this.state.leftDiff),
        leftDiff: 0,
        top: this.boundedTopPosition(this.state.top + this.state.topDiff),
        topDiff: 0
      });

      this.controlsRef.current!.blur();
    };

    private updatePosition = (mouseX: number, mouseY: number) => {
      const {
        height,
        width
      } = this.props.boundariesElement!.getBoundingClientRect();
      const mouseXDiff = mouseX - this.baseX;
      const mouseYDiff = mouseY - this.baseY;

      this.setState({
        leftDiff: unitToPercent(mouseXDiff, width),
        topDiff: unitToPercent(mouseYDiff, height)
      });
    };

    private setUpperBounds() {
      const {
        height: containerHeight,
        width: containerWidth
      } = this.props.boundariesElement!.getBoundingClientRect();
      const {
        height: elementHeight,
        width: elementWidth
      } = this.elementRef.current!.getBoundingClientRect();

      this.setState({
        leftUpperBound: 100 - unitToPercent(elementWidth, containerWidth),
        topUpperBound: 100 - unitToPercent(elementHeight, containerHeight)
      });
    }

    private boundedLeftPosition(pct: number) {
      return bounded(pct, this.state.leftLowerBound, this.state.leftUpperBound);
    }

    private boundedTopPosition(pct: number) {
      return bounded(pct, this.state.topLowerBound, this.state.topUpperBound);
    }
  };
}

export default withWindow;
