import * as React from 'react';
import {
  ARROW_DOWN_KEY,
  ARROW_LEFT_KEY,
  ARROW_RIGHT_KEY,
  ARROW_UP_KEY,
  END_KEY,
  HOME_KEY
} from '../../constants';
import { ExtendedHTMLElement } from '../../types';
import { unitToPercent } from '../../utils/math';
import styled from '../../utils/styled-components';
import { bounded } from '../../utils/ui';
import StyledButton from '../styled/StyledButton';
import StyledSvg from '../styled/StyledSvg';
import Move from '../svg/Move';

const StyledSvgIcon = StyledSvg.withComponent(Move);

const StyledControlsButton = styled(StyledButton)`
  display: block;
  height: 36px;
  width: 100%;

  background-color: ${(props) => props.theme.fg};
  svg {
    fill: ${(props) => props.theme.bg};
  }

  &:not([aria-disabled='true']):not([disabled]):not([aria-hidden='true']) {
    cursor: grab;
  }
`;

const StyledWindow = styled.div`
  position: absolute;

  background-color: ${(props) => props.theme.fg};
  border: 2px solid ${(props) => props.theme.bg};
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
    public boundariesElementWidth = 0;
    public boundariesElementHeight = 0;

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
              this.state.leftLowerBound,
              this.state.leftUpperBound
            )}%`,
            top: `${bounded(
              this.state.top + this.state.topDiff,
              this.state.topLowerBound,
              this.state.topUpperBound
            )}%`,
            width: `${this.state.width}%`
          }}
        >
          <StyledControlsButton
            className="draggable-control"
            innerRef={this.controlsRef}
            onMouseDown={this.dragStartHandler}
            onKeyDown={this.keyDownHandler}
          >
            <StyledSvgIcon />
          </StyledControlsButton>

          <WrappedComponent {...this.props} />
        </StyledWindow>
      );
    }

    private keyDownHandler = (evt: React.KeyboardEvent<HTMLButtonElement>) => {
      this.setUpperBounds();

      switch (evt.key) {
        case ARROW_RIGHT_KEY:
          this.setState({
            left: this.boundedLeftPosition(this.state.left + 5)
          });
          break;
        case ARROW_UP_KEY:
          this.setState({
            top: this.boundedTopPosition(this.state.top - 5)
          });
          break;
        case ARROW_LEFT_KEY:
          this.setState({
            left: this.boundedLeftPosition(this.state.left - 5)
          });
          break;
        case ARROW_DOWN_KEY:
          this.setState({
            top: this.boundedTopPosition(this.state.top + 5)
          });
          break;
        case HOME_KEY:
          this.setState({
            left: this.boundedLeftPosition(this.state.leftLowerBound),
            top: this.boundedTopPosition(this.state.topLowerBound)
          });
          break;
        case END_KEY:
          this.setState({
            left: this.boundedLeftPosition(this.state.leftUpperBound),
            top: this.boundedTopPosition(this.state.topUpperBound)
          });
          break;
      }
    };

    private dragStartHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
      evt.preventDefault();

      this.controlsRef.current!.focus();

      this.baseX = evt.pageX;
      this.baseY = evt.pageY;

      const {
        height,
        width
      } = this.props.boundariesElement!.getBoundingClientRect();
      this.boundariesElementWidth = width;
      this.boundariesElementHeight = height;

      this.setUpperBounds();

      this.setState({
        leftDiff: 0,
        topDiff: 0
      });

      document.addEventListener('mousemove', this.dragHandler, true);
      document.addEventListener('mouseup', this.dragEndHandler, true);
    };

    private dragHandler = (evt: MouseEvent) => {
      const xDiff = evt.pageX - this.baseX;
      const yDiff = evt.pageY - this.baseY;

      this.setState({
        leftDiff: unitToPercent(xDiff, this.boundariesElementWidth),
        topDiff: unitToPercent(yDiff, this.boundariesElementHeight)
      });
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

    /**
     * Defines the min and max positions of the movable element.
     *
     * This should be ran everytime user is starting an interaction to avoid
     * misplacement due to resizing.
     */
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
