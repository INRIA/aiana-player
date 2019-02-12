import React from 'react';
import {
  ARROW_DOWN_KEY,
  ARROW_LEFT_KEY,
  ARROW_RIGHT_KEY,
  ARROW_UP_KEY,
  DEFAULT_DRAGGABLE_SELECTOR,
  DEFAULT_MOVE_STEP,
  DIRECTION_BOTTOM,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_TOP,
  END_KEY,
  HOME_KEY
} from '../../../constants';
import { IUIWindow } from '../../../reducers/preferences';
import { Direction } from '../../../types';
import { unitToPercent } from '../../../utils/math';
import styled from '../../../utils/styled-components';
import { bounded } from '../../../utils/ui';
import DragButton from './DragButton';
import Resizers from './Resizers';

const StyledWindow = styled.div`
  position: absolute;

  padding: 0.5rem 0 0 0;

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
  boundariesSelector?: string;
  height: number;
  left: number;
  top: number;
  width: number;
  windowName: string;
  uiUpdateHandler(name: string, window: IUIWindow): void;
  [prop: string]: any;
}

interface IHOCState {
  heightDiff: number;
  leftDiff: number;
  topDiff: number;
  widthDiff: number;
}

function withWindow(WrappedComponent: React.ComponentType<any>) {
  return class WithWindow extends React.Component<
    IWrappedComponentProps,
    IHOCState
  > {
    static defaultProps: Partial<IWrappedComponentProps> = {
      boundariesSelector: DEFAULT_DRAGGABLE_SELECTOR
    };

    elementRef = React.createRef<HTMLDivElement>();

    containerWidth = 0;
    containerHeight = 0;

    constructor(props: IWrappedComponentProps) {
      super(props);

      this.state = {
        heightDiff: 0,
        leftDiff: 0,
        topDiff: 0,
        widthDiff: 0
      };
    }

    render() {
      return (
        <StyledWindow
          className="draggable"
          innerRef={this.elementRef}
          style={{
            height: `${this.props.height + this.state.heightDiff}%`,
            left: `${this.props.left}%`,
            top: `${this.props.top}%`,
            transform: `translate3d(${this.state.leftDiff}px, ${
              this.state.topDiff
            }px, 0)`,
            width: `${this.props.width + this.state.widthDiff}%`
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
      const resizer = directions.reduce(
        (prev: object, direction: Direction) => {
          return Object.assign(prev, this.resize(xDiff, yDiff, direction));
        },
        {}
      ) as IHOCState;

      this.setState(resizer);
    };

    private resize = (
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
            const futureRight = offsetLeftPct + this.props.width + diffPct;

            if (futureRight > 100) {
              const maxDiff = 100 - this.props.width - offsetLeftPct;

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
            const futureBottom = offsetTopPct + this.props.height + diffPct;

            if (futureBottom > 100) {
              const maxDiff = 100 - this.props.height - offsetTopPct;

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
      this.props.uiUpdateHandler(this.props.windowName, {
        height: this.props.height + this.state.heightDiff,
        left:
          this.props.left +
          unitToPercent(this.state.leftDiff, this.containerWidth),
        top:
          this.props.top +
          unitToPercent(this.state.topDiff, this.containerHeight),
        width: this.props.width + this.state.widthDiff
      });

      this.setState({
        heightDiff: 0,
        leftDiff: 0,
        topDiff: 0,
        widthDiff: 0
      });
    };

    private moveKeyDownHandler = (key: string) => {
      this.setUpperBounds();

      switch (key) {
        case ARROW_RIGHT_KEY:
          this.props.uiUpdateHandler(this.props.windowName, {
            left: this.boundedLeftPosition(this.props.left + DEFAULT_MOVE_STEP)
          });
          break;
        case ARROW_UP_KEY:
          this.props.uiUpdateHandler(this.props.windowName, {
            top: this.boundedTopPosition(this.props.top - DEFAULT_MOVE_STEP)
          });
          break;
        case ARROW_LEFT_KEY:
          this.props.uiUpdateHandler(this.props.windowName, {
            left: this.boundedLeftPosition(this.props.left - DEFAULT_MOVE_STEP)
          });
          break;
        case ARROW_DOWN_KEY:
          this.props.uiUpdateHandler(this.props.windowName, {
            top: this.boundedTopPosition(this.props.top + DEFAULT_MOVE_STEP)
          });
          break;
        case HOME_KEY:
          this.props.uiUpdateHandler(this.props.windowName, {
            left: this.boundedLeftPosition(0),
            top: this.boundedTopPosition(0)
          });
          break;
        case END_KEY:
          this.props.uiUpdateHandler(this.props.windowName, {
            left: this.boundedLeftPosition(100),
            top: this.boundedTopPosition(100)
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
      this.props.uiUpdateHandler(this.props.windowName, {
        left: unitToPercent(
          this.elementRef.current!.offsetLeft + this.state.leftDiff,
          this.containerWidth
        ),
        top: unitToPercent(
          this.elementRef.current!.offsetTop + this.state.topDiff,
          this.containerHeight
        )
      });

      this.setState({
        leftDiff: 0,
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
      const container = document.querySelector(
        this.props.boundariesSelector!
      ) as HTMLElement;

      this.containerWidth = container.offsetWidth;
      this.containerHeight = container.offsetHeight;
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
      return bounded(pct, 0, 100);
    }

    private boundedTopPosition(pct: number) {
      return bounded(pct, 0, 100);
    }
  };
}

export default withWindow;
