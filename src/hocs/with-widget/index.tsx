import classNames from 'classnames';
import React, { ComponentType, Component } from 'react';
import {
  DIRECTION_BOTTOM,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_TOP
} from '../../constants';
import { DEFAULT_WIDGET_MOVE_STEP } from '../../constants/preferences';
import {
  ARROW_DOWN_KEY,
  ARROW_LEFT_KEY,
  ARROW_RIGHT_KEY,
  ARROW_UP_KEY,
  END_KEY,
  HOME_KEY
} from '../../constants/keys';
import { IWidget } from '../../reducers/preferences';
import { Direction } from '../../types';
import { unitToPercent } from '../../utils/math';
import styled from '../../utils/styled-components';
import { bounded } from '../../utils/ui';
import CloseWidgetButton from './CloseWidgetButton';
import DragWidgetButton from './DragWidgetButton';
import Resizers from './Resizers';
import { WIDGETS_CONTAINER_CLASS } from '../../constants/widgets';

export interface IWrappedComponentProps {
  boundariesSelector?: string;
  ghost?: boolean;
  height: number;
  isDraggable: boolean;
  left: number;
  locked: boolean;
  minimumHeight?: number;
  minimumWidth?: number;
  name: string;
  top: number;
  visible: boolean;
  width: number;
  toggleDraggable(isDraggable: boolean): void;
  uiUpdateHandler(name: string, widget: Partial<IWidget>): void;
  [prop: string]: any;
}

interface IHOCState {
  heightDiff: number;
  leftDiff: number;
  topDiff: number;
  widthDiff: number;
}

const StyledWidget = styled.div`
  position: absolute;

  background-color: ${(props) => props.theme.fg};
  border: 1px solid ${(props) => props.theme.bg};

  &.aip-widget__ghost {
    background-color: transparent;
    border-color: transparent;

    pointer-events: none;
  }

  &:not(.aip-widget__locked):hover {
    background-color: ${(props) => props.theme.fg};
    border-color: ${(props) => props.theme.bg};

    .aip-widget-topbar.activable {
      opacity: 1;
    }
  }

  .aip-widget-topbar {
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

  .aip-widgetized {
    height: 100%;
    overflow: auto;
  }
`;

const defaultState: IHOCState = {
  heightDiff: 0,
  leftDiff: 0,
  topDiff: 0,
  widthDiff: 0
};

const defaultProps: Partial<IWrappedComponentProps> = {
  boundariesSelector: WIDGETS_CONTAINER_CLASS,
  minimumHeight: 20,
  minimumWidth: 20
};

function withWidget(WrappedComponent: ComponentType<any>) {
  return class WithWidget extends Component<IWrappedComponentProps, IHOCState> {
    static readonly defaultProps = defaultProps;

    elementRef = React.createRef<HTMLDivElement>();
    containerWidth = 0;
    containerHeight = 0;

    readonly state = defaultState;

    render() {
      return (
        <StyledWidget
          className={classNames('aip-widget', {
            'aip-widget__ghost': this.props.ghost,
            'aip-widget__locked': this.props.locked
          })}
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
              className={classNames('aip-widget-topbar', {
                activable: this.props.isDraggable
              })}
            >
              <DragWidgetButton
                isDraggable={this.props.isDraggable}
                dragEnd={this.dragEndHandler}
                dragStart={this.dragStartHandler}
                dragUpdate={this.dragUpdateHandler}
                keyUpdate={this.moveKeyDownHandler}
                widgetName={this.props.name}
              />
              <CloseWidgetButton
                widgetName={this.props.name}
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
              widgetName={this.props.name}
            />
          )}
          <div className="aip-widgetized">
            <WrappedComponent {...this.props} />
          </div>
        </StyledWidget>
      );
    }

    resizeKeyUpdate = (key: string, handlePositions: Direction[]) => {
      const resizer = handlePositions.reduce(
        (prev: object, handlePosition: Direction) => {
          return Object.assign(prev, this.resizeKey(key, handlePosition));
        },
        {}
      ) as IWidget;

      // Only dispatch when widget got resize
      if (Object.keys(resizer).length > 0) {
        this.props.uiUpdateHandler(this.props.name, resizer);
      }
    };

    resizeKey = (key: string, handlePosition: Direction) => {
      let newCoords = {};

      switch (handlePosition) {
        case DIRECTION_TOP:
          // widget will have its top and height updated
          if (key === ARROW_UP_KEY) {
            // widget will have its top lowered and height increased.
            const expectedTop = this.props.top - DEFAULT_WIDGET_MOVE_STEP;

            if (expectedTop > 0) {
              // Expected `top` of the widget is still in bounds

              newCoords = {
                height: this.props.height + DEFAULT_WIDGET_MOVE_STEP,
                top: expectedTop
              };
            } else {
              // Expected `top` of the widget is not in bounds
              newCoords = {
                height: this.props.height + this.props.top,
                top: 0
              };
            }
          } else if (key === ARROW_DOWN_KEY) {
            // widget will have its top increased and height lowered.
            const expectedHeight = this.props.height - DEFAULT_WIDGET_MOVE_STEP;

            if (expectedHeight < this.props.minimumHeight!) {
              // Expected height of the widget is out of bounds
              newCoords = {
                height: this.props.minimumHeight,
                top:
                  this.props.top -
                  (this.props.height - this.props.minimumHeight!)
              };
            } else {
              // Expected height of the widget is in bounds
              newCoords = {
                height: expectedHeight,
                top: this.props.top + DEFAULT_WIDGET_MOVE_STEP
              };
            }
          }

          break;
        case DIRECTION_RIGHT:
          // widget will have its width updated
          if (key === ARROW_RIGHT_KEY) {
            // increase widget width
            const expectedWidth = this.props.width + DEFAULT_WIDGET_MOVE_STEP;
            const expectedRight = this.props.left + expectedWidth;

            if (expectedRight > 100) {
              // expected right border of the widget is out of bounds
              newCoords = {
                width: 100 - this.props.left
              };
            } else {
              // expected right border of the widget is in bounds
              newCoords = {
                width: expectedWidth
              };
            }
          } else if (key === ARROW_LEFT_KEY) {
            // decrease widget width
            newCoords = {
              width: this.boundedWidth(
                this.props.width - DEFAULT_WIDGET_MOVE_STEP
              )
            };
          }

          break;
        case DIRECTION_BOTTOM:
          // widget will have its height updated
          if (key === ARROW_DOWN_KEY) {
            // increase widget height
            const expectedHeight = this.props.height + DEFAULT_WIDGET_MOVE_STEP;
            const expectedBottom = this.props.top + expectedHeight;

            if (expectedBottom > 100) {
              // expected bottom border of the widget is out of bounds
              newCoords = {
                height: 100 - this.props.top
              };
            } else {
              // expected bottom border of the widget is in bounds
              newCoords = {
                height: expectedHeight
              };
            }
          } else if (key === ARROW_UP_KEY) {
            // decrease widget height
            newCoords = {
              height: this.boundedHeight(
                this.props.height - DEFAULT_WIDGET_MOVE_STEP
              )
            };
          }
          break;
        case DIRECTION_LEFT:
          // widget will have its width and left position updated
          if (key === ARROW_LEFT_KEY) {
            // decrease left position, increase width
            const expectedLeft = this.props.left - DEFAULT_WIDGET_MOVE_STEP;

            if (expectedLeft > 0) {
              // expected left border of the widget is in bounds
              newCoords = {
                left: expectedLeft,
                width: this.props.width + DEFAULT_WIDGET_MOVE_STEP
              };
            } else {
              // expected left border of the widget is out of bounds
              newCoords = {
                left: 0,
                width: this.props.width + this.props.left
              };
            }
          } else if (key === ARROW_RIGHT_KEY) {
            // increase left position, decrease width
            const expectedWidth = this.props.width - DEFAULT_WIDGET_MOVE_STEP;

            if (expectedWidth < this.props.minimumWidth!) {
              // expected left border of the widget is out of bounds
              newCoords = {
                left:
                  this.props.left +
                  (this.props.width - this.props.minimumWidth!),
                width: this.props.minimumWidth!
              };
            } else {
              // expected left border of the widget is in bounds
              newCoords = {
                left: this.props.left + DEFAULT_WIDGET_MOVE_STEP,
                width: expectedWidth
              };
            }
          }
          break;
      }

      return newCoords;
    };

    resizeStartHandler = () => {
      this.setUpperBounds();
    };

    resizeUpdateHandler = (
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
    resize = (
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

    resizeEndHandler = () => {
      this.props.uiUpdateHandler(this.props.name, {
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

    moveKeyDownHandler = (key: string) => {
      this.setUpperBounds();

      switch (key) {
        case ARROW_RIGHT_KEY:
          this.props.uiUpdateHandler(this.props.name, {
            left: this.boundedLeftPosition(
              this.props.left + DEFAULT_WIDGET_MOVE_STEP
            )
          });
          break;
        case ARROW_UP_KEY:
          this.props.uiUpdateHandler(this.props.name, {
            top: this.boundedTopPosition(
              this.props.top - DEFAULT_WIDGET_MOVE_STEP
            )
          });
          break;
        case ARROW_LEFT_KEY:
          this.props.uiUpdateHandler(this.props.name, {
            left: this.boundedLeftPosition(
              this.props.left - DEFAULT_WIDGET_MOVE_STEP
            )
          });
          break;
        case ARROW_DOWN_KEY:
          this.props.uiUpdateHandler(this.props.name, {
            top: this.boundedTopPosition(
              this.props.top + DEFAULT_WIDGET_MOVE_STEP
            )
          });
          break;
        case HOME_KEY:
          this.props.uiUpdateHandler(this.props.name, {
            left: this.boundedLeftPosition(0),
            top: this.boundedTopPosition(0)
          });
          break;
        case END_KEY:
          this.props.uiUpdateHandler(this.props.name, {
            left: this.boundedLeftPosition(100),
            top: this.boundedTopPosition(100)
          });
          break;
      }
    };

    dragStartHandler = () => {
      this.props.toggleDraggable(false);
      this.setUpperBounds();
    };

    dragUpdateHandler = (xDiff: number, yDiff: number) => {
      this.setState({
        leftDiff: this.safeXTranslate(xDiff),
        topDiff: this.safeYTranslate(yDiff)
      });
    };

    /**
     * Syncs properties and resets the diffs.
     */
    dragEndHandler = () => {
      this.props.uiUpdateHandler(this.props.name, {
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

    boundedWidth(w: number): number {
      return bounded(w, this.props.minimumWidth!, 100);
    }

    boundedHeight(h: number): number {
      return bounded(h, this.props.minimumHeight!, 100);
    }

    /**
     * Defines the min and max positions of the movable element.
     *
     * This should be ran everytime user is starting an interaction in order to
     * avoid misplacement due to resizing.
     */
    setUpperBounds() {
      const container = document.querySelector(
        this.props.boundariesSelector!
      ) as HTMLElement;

      this.containerWidth = container.offsetWidth;
      this.containerHeight = container.offsetHeight;
    }

    safeXTranslate(deltaX: number): number {
      const { offsetLeft, offsetWidth } = this.elementRef.current!;

      return this.safeTranslate(
        deltaX,
        offsetLeft,
        offsetWidth,
        this.containerWidth
      );
    }

    safeYTranslate(deltaY: number): number {
      const { offsetTop, offsetHeight } = this.elementRef.current!;

      return this.safeTranslate(
        deltaY,
        offsetTop,
        offsetHeight,
        this.containerHeight
      );
    }

    safeTranslate(
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

    boundedLeftPosition(pct: number) {
      return this.boundedPosition(
        pct,
        this.elementRef.current!.offsetWidth,
        this.containerWidth
      );
    }

    boundedTopPosition(pct: number) {
      return this.boundedPosition(
        pct,
        this.elementRef.current!.offsetHeight,
        this.containerHeight
      );
    }

    boundedPosition(pct: number, positionPx: number, maxPx: number): number {
      return bounded(pct, 0, 100 - unitToPercent(positionPx, maxPx));
    }
  };
}

export default withWidget;
