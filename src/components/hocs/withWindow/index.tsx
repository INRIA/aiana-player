import * as React from 'react';
import {
  ARROW_DOWN_KEY,
  ARROW_LEFT_KEY,
  ARROW_RIGHT_KEY,
  ARROW_UP_KEY,
  DEFAULT_MOVE_STEP,
  DIRECTION_BOTTOM,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_TOP,
  END_KEY,
  HOME_KEY
} from '../../../constants';
import { Direction, ExtendedHTMLElement } from '../../../types';
import { unitToPercent } from '../../../utils/math';
import styled from '../../../utils/styled-components';
import { bounded } from '../../../utils/ui';
import DragButton from './DragButton';
import Resizers from './Resizers';

const StyledWindow = styled.div`
  position: absolute;
  padding: 0.5rem;

  background-color: ${(props) => props.theme.fg};

  .aip-windowed {
    height: calc(100% - 1.5rem);
    overflow: auto;
  }
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

    public containerWidth = 0;
    public containerHeight = 0;

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
            left: `${this.state.left}%`,
            top: `${this.state.top}%`,
            transform: `translate3d(${this.state.leftDiff}px, ${
              this.state.topDiff
            }px, 0)`,
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

          <div className="aip-windowed">
            <WrappedComponent {...this.props} />
          </div>
        </StyledWindow>
      );
    }

    private resizeStartHandler = () => {
      this.setUpperBounds();
    };

    private resizeUpdateHandler = (
      xDiff: number,
      yDiff: number,
      directions: Direction[]
    ) => {
      this.setState(directions.reduce((prev: object, direction: Direction) => {
        return Object.assign(prev, this.resizeWIP(xDiff, yDiff, direction));
      }, {}) as IHOCState);
    };

    private resizeWIP = (
      xDiff: number,
      yDiff: number,
      direction: Direction
    ): object => {
      let newCoords = {};

      switch (direction) {
        case DIRECTION_TOP:
          {
            const offsetTopPct = unitToPercent(
              this.elementRef.current!.offsetTop,
              this.containerHeight
            );
            const diffPct = unitToPercent(yDiff, this.containerHeight);
            const futureTop = offsetTopPct + diffPct;

            if (futureTop < 0) {
              const maxDiff = offsetTopPct;

              newCoords = {
                heightDiff: maxDiff,
                topDiff: this.safeYTranslate(yDiff)
              };
            } else {
              newCoords = {
                heightDiff: -diffPct,
                topDiff: this.safeYTranslate(yDiff)
              };
            }
          }
          break;
        case DIRECTION_RIGHT:
          {
            const offsetLeftPct = unitToPercent(
              this.elementRef.current!.offsetLeft,
              this.containerWidth
            );
            const diffPct = unitToPercent(xDiff, this.containerWidth);
            const futureRight = offsetLeftPct + this.state.width + diffPct;

            if (futureRight > 100) {
              const maxDiff = 100 - this.state.width - offsetLeftPct;

              newCoords = {
                widthDiff: maxDiff
              };
            } else {
              newCoords = {
                widthDiff: diffPct
              };
            }
          }
          break;
        case DIRECTION_BOTTOM:
          {
            const offsetTopPct = unitToPercent(
              this.elementRef.current!.offsetTop,
              this.containerHeight
            );
            const diffPct = unitToPercent(yDiff, this.containerHeight);
            const futureBottom = offsetTopPct + this.state.height + diffPct;

            if (futureBottom > 100) {
              const maxDiff = 100 - this.state.height - offsetTopPct;

              newCoords = {
                heightDiff: maxDiff,
                widthDiff: 0
              };
            } else {
              newCoords = {
                heightDiff: diffPct,
                widthDiff: 0
              };
            }
          }
          break;
        case DIRECTION_LEFT:
          {
            const offsetLeftPct = unitToPercent(
              this.elementRef.current!.offsetLeft,
              this.containerWidth
            );
            const diffPct = unitToPercent(xDiff, this.containerWidth);
            const futureLeft = offsetLeftPct + diffPct;

            if (futureLeft < 0) {
              const maxDiff = offsetLeftPct;

              newCoords = {
                leftDiff: this.safeXTranslate(xDiff),
                widthDiff: maxDiff
              };
            } else {
              newCoords = {
                leftDiff: this.safeXTranslate(xDiff),
                widthDiff: -diffPct
              };
            }
          }
          break;
      }

      return newCoords;
    };

    private resizeEndHandler = () => {
      this.setState({
        height: this.state.height + this.state.heightDiff,
        heightDiff: 0,
        left:
          this.state.left +
          unitToPercent(this.state.leftDiff, this.containerWidth),
        leftDiff: 0,
        top:
          this.state.top +
          unitToPercent(this.state.topDiff, this.containerHeight),
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
        leftDiff: this.safeXTranslate(xDiff),
        topDiff: this.safeYTranslate(yDiff)
      });
    };

    /**
     * Syncs properties and resets the diffs.
     */
    private dragEndHandler = () => {
      this.setState({
        left: unitToPercent(
          this.elementRef.current!.offsetLeft + this.state.leftDiff,
          this.containerWidth
        ),
        leftDiff: 0,
        top: unitToPercent(
          this.elementRef.current!.offsetTop + this.state.topDiff,
          this.containerHeight
        ),
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
        offsetHeight: containerHeight,
        offsetWidth: containerWidth
      } = this.props.boundariesElement!;

      this.containerWidth = containerWidth;
      this.containerHeight = containerHeight;

      const {
        offsetHeight: elementHeight,
        offsetWidth: elementWidth
      } = this.elementRef.current!;

      this.setState({
        leftUpperBound: 100 - unitToPercent(elementWidth, containerWidth),
        topUpperBound: 100 - unitToPercent(elementHeight, containerHeight)
      });
    }

    private safeXTranslate(x: number): number {
      const { offsetLeft, offsetWidth } = this.elementRef.current!;

      if (offsetLeft + x < 0) {
        return -offsetLeft;
      } else if (offsetLeft + offsetWidth + x > this.containerWidth) {
        return this.containerWidth - offsetLeft - offsetWidth;
      }

      return x;
    }

    private safeYTranslate(y: number): number {
      const { offsetTop, offsetHeight } = this.elementRef.current!;

      if (offsetTop + y < 0) {
        return -offsetTop;
      } else if (offsetTop + offsetHeight + y > this.containerHeight) {
        return this.containerHeight - offsetTop - offsetHeight;
      }

      return y;
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
