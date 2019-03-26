import classNames from 'classnames';
import React from 'react';
import {
  ARROW_DOWN_KEY,
  ARROW_LEFT_KEY,
  ARROW_RIGHT_KEY,
  ARROW_UP_KEY,
  DEFAULT_MOVE_STEP,
  DEFAULT_WINDOWS_CONTAINER,
  DIRECTION_BOTTOM,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_TOP,
  END_KEY,
  HOME_KEY
} from '../../constants';
import { IUIWindow } from '../../reducers/preferences';
import { Direction } from '../../types';
import { unitToPercent } from '../../utils/math';
import styled from '../../utils/styled-components';
import { bounded } from '../../utils/ui';
import CloseWindowButton from './CloseWindowButton';
import DragWindowButton from './DragWindowButton';
import Resizers from './Resizers';

export interface IWrappedComponentProps {
  boundariesSelector?: string;
  height: number;
  isDraggable: boolean;
  left: number;
  locked: boolean;
  minimumHeight?: number;
  minimumWidth?: number;
  top: number;
  visible: boolean;
  width: number;
  windowId: string;
  toggleDraggable(isDraggable: boolean): void;
  uiUpdateHandler(name: string, window: Partial<IUIWindow>): void;
  [prop: string]: any;
}

interface IHOCState {
  heightDiff: number;
  leftDiff: number;
  topDiff: number;
  widthDiff: number;
}

const StyledWindow = styled.div`
  position: absolute;

  background-color: ${(props) => props.theme.fg};

  &:hover .aip-window-topbar.activable {
    opacity: 1;
  }

  .aip-window-topbar {
    width: calc(100% - 2px);
    height: 2.5em;

    padding: 0.5em 0;

    position: absolute;
    top: 1px;
    left: 1px;

    z-index: 1;

    opacity: 0;
    background-color: ${(props) => props.theme.clearFg};
    border-bottom: 1px solid ${(props) => props.theme.bg};

    &.activable {
      &:hover,
      &:focus-within {
        opacity: 1;
      }
    }
  }

  .aip-windowed {
    height: 100%;
    overflow: auto;

    border: 1px solid ${(props) => props.theme.bg};
  }
`;

const defaultState: IHOCState = {
  heightDiff: 0,
  leftDiff: 0,
  topDiff: 0,
  widthDiff: 0
};

const defaultProps: Partial<IWrappedComponentProps> = {
  boundariesSelector: DEFAULT_WINDOWS_CONTAINER,
  minimumHeight: 20,
  minimumWidth: 20
};

function withWindow(WrappedComponent: React.ComponentType<any>) {
  return class WithWindow extends React.Component<
    IWrappedComponentProps,
    IHOCState
  > {
    static readonly defaultProps = defaultProps;

    elementRef = React.createRef<HTMLDivElement>();
    containerWidth = 0;
    containerHeight = 0;

    readonly state = defaultState;

    render() {
      return (
        <StyledWindow
          className="aip-window"
          hidden={!this.props.visible}
          ref={this.elementRef}
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
          {!this.props.locked && (
            <div
              className={classNames('aip-window-topbar', {
                activable: this.props.isDraggable
              })}
            >
              <DragWindowButton
                isDraggable={this.props.isDraggable}
                dragEnd={this.dragEndHandler}
                dragStart={this.dragStartHandler}
                dragUpdate={this.dragUpdateHandler}
                keyUpdate={this.moveKeyDownHandler}
                windowId={this.props.windowId}
              />
              <CloseWindowButton
                windowId={this.props.windowId}
                activable={this.props.isDraggable}
              />
            </div>
          )}

          {!this.props.locked && (
            <Resizers
              keyUpdate={this.resizeKeyUpdate}
              resizeStart={this.resizeStartHandler}
              resizeUpdate={this.resizeUpdateHandler}
              resizeEnd={this.resizeEndHandler}
              windowId={this.props.windowId}
            />
          )}
          <div className="aip-windowed">
            <WrappedComponent {...this.props} />
          </div>
        </StyledWindow>
      );
    }

    private resizeKeyUpdate = (key: string, handlePositions: Direction[]) => {
      const resizer = handlePositions.reduce(
        (prev: object, handlePosition: Direction) => {
          return Object.assign(prev, this.resizeKey(key, handlePosition));
        },
        {}
      ) as IUIWindow;

      // Only dispatch when window got resize
      if (Object.keys(resizer).length > 0) {
        this.props.uiUpdateHandler(this.props.windowId, resizer);
      }
    };

    private resizeKey = (key: string, handlePosition: Direction) => {
      let newCoords = {};

      switch (handlePosition) {
        case DIRECTION_TOP:
          // window will have its top and height updated
          if (key === ARROW_UP_KEY) {
            // window will have its top lowered and height increased.
            const expectedTop = this.props.top - DEFAULT_MOVE_STEP;

            if (expectedTop > 0) {
              // Expected `top` of the window is still in bounds

              newCoords = {
                height: this.props.height + DEFAULT_MOVE_STEP,
                top: expectedTop
              };
            } else {
              // Expected `top` of the window is not in bounds
              newCoords = {
                height: this.props.height + this.props.top,
                top: 0
              };
            }
          } else if (key === ARROW_DOWN_KEY) {
            // window will have its top increased and height lowered.
            const expectedHeight = this.props.height - DEFAULT_MOVE_STEP;

            if (expectedHeight < this.props.minimumHeight!) {
              // Expected height of the window is out of bounds
              newCoords = {
                height: this.props.minimumHeight,
                top:
                  this.props.top -
                  (this.props.height - this.props.minimumHeight!)
              };
            } else {
              // Expected height of the window is in bounds
              newCoords = {
                height: expectedHeight,
                top: this.props.top + DEFAULT_MOVE_STEP
              };
            }
          }

          break;
        case DIRECTION_RIGHT:
          // window will have its width updated
          if (key === ARROW_RIGHT_KEY) {
            // increase window width
            const expectedWidth = this.props.width + DEFAULT_MOVE_STEP;
            const expectedRight = this.props.left + expectedWidth;

            if (expectedRight > 100) {
              // expected right border of the window is out of bounds
              newCoords = {
                width: 100 - this.props.left
              };
            } else {
              // expected right border of the window is in bounds
              newCoords = {
                width: expectedWidth
              };
            }
          } else if (key === ARROW_LEFT_KEY) {
            // decrease window width
            newCoords = {
              width: this.boundedWidth(this.props.width - DEFAULT_MOVE_STEP)
            };
          }

          break;
        case DIRECTION_BOTTOM:
          // window will have its height updated
          if (key === ARROW_DOWN_KEY) {
            // increase window height
            const expectedHeight = this.props.height + DEFAULT_MOVE_STEP;
            const expectedBottom = this.props.top + expectedHeight;

            if (expectedBottom > 100) {
              // expected bottom border of the window is out of bounds
              newCoords = {
                height: 100 - this.props.top
              };
            } else {
              // expected bottom border of the window is in bounds
              newCoords = {
                height: expectedHeight
              };
            }
          } else if (key === ARROW_UP_KEY) {
            // decrease window height
            newCoords = {
              height: this.boundedHeight(this.props.height - DEFAULT_MOVE_STEP)
            };
          }
          break;
        case DIRECTION_LEFT:
          // window will have its width and left position updated
          if (key === ARROW_LEFT_KEY) {
            // decrease left position, increase width
            const expectedLeft = this.props.left - DEFAULT_MOVE_STEP;

            if (expectedLeft > 0) {
              // expected left border of the window is in bounds
              newCoords = {
                left: expectedLeft,
                width: this.props.width + DEFAULT_MOVE_STEP
              };
            } else {
              // expected left border of the window is out of bounds
              newCoords = {
                left: 0,
                width: this.props.width + this.props.left
              };
            }
          } else if (key === ARROW_RIGHT_KEY) {
            // increase left position, decrease width
            const expectedWidth = this.props.width - DEFAULT_MOVE_STEP;

            if (expectedWidth < this.props.minimumWidth!) {
              // expected left border of the window is out of bounds
              newCoords = {
                left:
                  this.props.left +
                  (this.props.width - this.props.minimumWidth!),
                width: this.props.minimumWidth!
              };
            } else {
              // expected left border of the window is in bounds
              newCoords = {
                left: this.props.left + DEFAULT_MOVE_STEP,
                width: expectedWidth
              };
            }
          }
          break;
      }

      return newCoords;
    };

    private resizeStartHandler = () => {
      this.setUpperBounds();
    };

    private resizeUpdateHandler = (
      xDiff: number,
      yDiff: number,
      handlePositions: Direction[]
    ) => {
      const resizer = handlePositions.reduce(
        (prev: object, handlePosition: Direction) => {
          return Object.assign(prev, this.resize(xDiff, yDiff, handlePosition));
        },
        {}
      ) as IHOCState;

      this.setState(resizer);
    };

    /**
     * @param xDiff The x-axis difference, expressed in pixels
     * @param yDiff The y-axis difference, expressed in pixels
     * @param handlePosition The orientation of the resizing (the handle position)
     * @returns An object to use in order to set state
     */
    private resize = (
      xDiff: number,
      yDiff: number,
      handlePosition: Direction
    ): object => {
      let newCoords: Partial<IHOCState> = {};

      switch (handlePosition) {
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
            const expectedRight = offsetLeftPct + this.props.width + diffPct;
            const expectedWidth = this.props.width + diffPct;

            if (expectedWidth < this.props.minimumWidth!) {
              newCoords = {
                widthDiff: this.props.minimumWidth! - this.props.width
              };
            } else if (expectedRight > 100) {
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
            const expectedBottom = offsetTopPct + this.props.height + diffPct;
            const expectedHeight = this.props.height + diffPct;

            if (expectedHeight < this.props.minimumHeight!) {
              newCoords = {
                heightDiff: this.props.minimumHeight! - this.props.height
              };
            } else if (expectedBottom > 100) {
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
            const expectedLeft = offsetLeftPct + diffPct;

            if (expectedLeft < 0) {
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
      this.props.uiUpdateHandler(this.props.windowId, {
        height: this.props.height + this.state.heightDiff,
        left:
          this.props.left +
          unitToPercent(this.state.leftDiff, this.containerWidth),
        top:
          this.props.top +
          unitToPercent(this.state.topDiff, this.containerHeight),
        width: this.props.width + this.state.widthDiff
      });

      this.setState(defaultState);
    };

    private moveKeyDownHandler = (key: string) => {
      this.setUpperBounds();

      switch (key) {
        case ARROW_RIGHT_KEY:
          this.props.uiUpdateHandler(this.props.windowId, {
            left: this.boundedLeftPosition(this.props.left + DEFAULT_MOVE_STEP)
          });
          break;
        case ARROW_UP_KEY:
          this.props.uiUpdateHandler(this.props.windowId, {
            top: this.boundedTopPosition(this.props.top - DEFAULT_MOVE_STEP)
          });
          break;
        case ARROW_LEFT_KEY:
          this.props.uiUpdateHandler(this.props.windowId, {
            left: this.boundedLeftPosition(this.props.left - DEFAULT_MOVE_STEP)
          });
          break;
        case ARROW_DOWN_KEY:
          this.props.uiUpdateHandler(this.props.windowId, {
            top: this.boundedTopPosition(this.props.top + DEFAULT_MOVE_STEP)
          });
          break;
        case HOME_KEY:
          this.props.uiUpdateHandler(this.props.windowId, {
            left: this.boundedLeftPosition(0),
            top: this.boundedTopPosition(0)
          });
          break;
        case END_KEY:
          this.props.uiUpdateHandler(this.props.windowId, {
            left: this.boundedLeftPosition(100),
            top: this.boundedTopPosition(100)
          });
          break;
      }
    };

    private dragStartHandler = () => {
      this.props.toggleDraggable(false);
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
      this.props.uiUpdateHandler(this.props.windowId, {
        left: unitToPercent(
          this.elementRef.current!.offsetLeft + this.state.leftDiff,
          this.containerWidth
        ),
        top: unitToPercent(
          this.elementRef.current!.offsetTop + this.state.topDiff,
          this.containerHeight
        )
      });

      this.setState(defaultState);
      this.props.toggleDraggable(true);
    };

    private boundedWidth(w: number): number {
      return bounded(w, this.props.minimumWidth!, 100);
    }

    private boundedHeight(h: number): number {
      return bounded(h, this.props.minimumHeight!, 100);
    }

    /**
     * Defines the min and max positions of the movable element.
     *
     * This should be ran everytime user is starting an interaction in order to
     * avoid misplacement due to resizing.
     */
    private setUpperBounds() {
      const container = document.querySelector(
        this.props.boundariesSelector!
      ) as HTMLElement;

      this.containerWidth = container.offsetWidth;
      this.containerHeight = container.offsetHeight;
    }

    private safeXTranslate(deltaX: number): number {
      const { offsetLeft, offsetWidth } = this.elementRef.current!;

      return this.safeTranslate(
        deltaX,
        offsetLeft,
        offsetWidth,
        this.containerWidth
      );
    }

    private safeYTranslate(deltaY: number): number {
      const { offsetTop, offsetHeight } = this.elementRef.current!;

      return this.safeTranslate(
        deltaY,
        offsetTop,
        offsetHeight,
        this.containerHeight
      );
    }

    private safeTranslate(
      delta: number,
      pos: number,
      size: number,
      containerSize: number
    ): number {
      if (pos + delta < 0) {
        return -pos;
      } else if (pos + size + delta > containerSize) {
        return containerSize - pos - size;
      }

      return delta;
    }

    private boundedLeftPosition(pct: number) {
      return this.boundedPosition(
        pct,
        this.elementRef.current!.offsetWidth,
        this.containerWidth
      );
    }

    private boundedTopPosition(pct: number) {
      return this.boundedPosition(
        pct,
        this.elementRef.current!.offsetHeight,
        this.containerHeight
      );
    }

    private boundedPosition(
      pct: number,
      positionPx: number,
      maxPx: number
    ): number {
      return bounded(pct, 0, 100 - unitToPercent(positionPx, maxPx));
    }
  };
}

export default withWindow;
