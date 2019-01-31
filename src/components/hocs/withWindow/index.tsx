import * as React from 'react';
import {
  ARROW_DOWN_KEY,
  ARROW_LEFT_KEY,
  ARROW_RIGHT_KEY,
  ARROW_UP_KEY,
  DEFAULT_MOVE_STEP,
  Direction,
  END_KEY,
  HOME_KEY
} from '../../../constants';
import { ExtendedHTMLElement } from '../../../types';
import { unitToPercent } from '../../../utils/math';
import styled from '../../../utils/styled-components';
import { bounded } from '../../../utils/ui';
import DragButton from './DragButton';
import Resizers from './Resizers';

const StyledWindow = styled.div`
  position: absolute;

  background-color: ${(props) => props.theme.fg};
`;

export interface IWindow {
  isDraggable: boolean;
}

interface IWrappedComponentProps {
  boundariesElement?: ExtendedHTMLElement;
  [prop: string]: any;
}

interface IHOCState {
  height: number;
  heightDiff: number;
  left: number;
  leftDiff: number;
  leftLowerBound: number;
  leftUpperBound: number;
  top: number;
  topDiff: number;
  topLowerBound: number;
  topUpperBound: number;
  width: number;
  widthDiff: number;
}

function withWindow(WrappedComponent: React.ComponentType<any>) {
  return class extends React.Component<IWrappedComponentProps, IHOCState> {
    public elementRef = React.createRef<HTMLDivElement>();

    public boundariesElementWidth = 0;
    public boundariesElementHeight = 0;

    // TODO: height, left, top, and width should be moved to props and be updated through a dispatch.
    public state = {
      height: 35,
      heightDiff: 0,
      left: 0,
      leftDiff: 0,
      leftLowerBound: 0,
      leftUpperBound: 100,
      top: 0,
      topDiff: 0,
      topLowerBound: 0,
      topUpperBound: 100,
      width: 35,
      widthDiff: 0
    };

    public render() {
      return (
        <StyledWindow
          className="draggable"
          innerRef={this.elementRef}
          style={{
            height: `${this.state.height + this.state.heightDiff}%`,
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
            width: `${this.state.width + this.state.widthDiff}%`
          }}
        >
          <DragButton
            dragEnd={this.dragEndHandler}
            dragStart={this.dragStartHandler}
            dragUpdate={this.dragUpdateHandler}
            keyUpdate={this.moveKeyDownHandler}
          />

          <Resizers
            resizeStart={this.resizeStartHandler}
            resizeUpdate={this.resizeUpdateHandler}
            resizeEnd={this.resizeEndHandler}
          />

          <WrappedComponent {...this.props} />
        </StyledWindow>
      );
    }

    private resizeStartHandler = () => {
      this.setUpperBounds();
      console.log('resize start');
    };

    private resizeUpdateHandler = (
      xDiff: number,
      yDiff: number,
      direction: Direction
    ) => {
      switch (direction) {
        case Direction.Top:
          console.log('resize', 0, yDiff, direction);
          this.setState({
            heightDiff: unitToPercent(-yDiff, this.boundariesElementHeight),
            topDiff: unitToPercent(yDiff, this.boundariesElementHeight)
          });
          break;
        case Direction.Right:
          console.log('resize', xDiff, 0, direction);
          this.setState({
            heightDiff: 0,
            widthDiff: unitToPercent(xDiff, this.boundariesElementWidth)
          });
          break;
        case Direction.Bottom:
          console.log('resize', 0, yDiff, direction);
          this.setState({
            heightDiff: unitToPercent(yDiff, this.boundariesElementHeight),
            widthDiff: 0
          });
          break;
        case Direction.Left:
          console.log('resize', xDiff, 0, direction);
          this.setState({
            leftDiff: unitToPercent(xDiff, this.boundariesElementWidth),
            widthDiff: unitToPercent(-xDiff, this.boundariesElementWidth)
          });
          break;
      }
    };

    private resizeEndHandler = () => {
      console.log('resize end');
      this.setState({
        height: this.state.height + this.state.heightDiff,
        heightDiff: 0,
        left: this.state.left + this.state.leftDiff,
        leftDiff: 0,
        top: this.state.top + this.state.topDiff,
        topDiff: 0,
        width: this.state.width + this.state.widthDiff,
        widthDiff: 0
      });
    };

    private moveKeyDownHandler = (key: string) => {
      this.setUpperBounds();

      switch (key) {
        case ARROW_RIGHT_KEY:
          this.setState({
            left: this.boundedLeftPosition(this.state.left + DEFAULT_MOVE_STEP)
          });
          break;
        case ARROW_UP_KEY:
          this.setState({
            top: this.boundedTopPosition(this.state.top - DEFAULT_MOVE_STEP)
          });
          break;
        case ARROW_LEFT_KEY:
          this.setState({
            left: this.boundedLeftPosition(this.state.left - DEFAULT_MOVE_STEP)
          });
          break;
        case ARROW_DOWN_KEY:
          this.setState({
            top: this.boundedTopPosition(this.state.top + DEFAULT_MOVE_STEP)
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

    private dragStartHandler = () => {
      this.setUpperBounds();
    };

    private dragUpdateHandler = (xDiff: number, yDiff: number) => {
      this.setState({
        leftDiff: unitToPercent(xDiff, this.boundariesElementWidth),
        topDiff: unitToPercent(yDiff, this.boundariesElementHeight)
      });
    };

    private dragEndHandler = () => {
      this.setState({
        left: this.boundedLeftPosition(this.state.left + this.state.leftDiff),
        leftDiff: 0,
        top: this.boundedTopPosition(this.state.top + this.state.topDiff),
        topDiff: 0
      });
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

      this.boundariesElementWidth = containerWidth;
      this.boundariesElementHeight = containerHeight;

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
