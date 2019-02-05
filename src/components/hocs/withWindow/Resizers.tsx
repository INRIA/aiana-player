import * as React from 'react';
import {
  DIRECTION_BOTTOM,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_TOP
} from '../../../constants';
import { Direction } from '../../../types';
import ResizeButton from './ResizeButton';

interface IProps {
  resizeStart(): void;
  resizeUpdate(xDiff: number, yDiff: number, directions: Direction[]): void;
  resizeEnd(): void;
}

class Resizers extends React.Component<IProps> {
  public baseX = 0;
  public baseY = 0;
  public currentDirections?: Direction[];

  // FIXME: better markup please, and accessibility keys
  public render() {
    return (
      // FIXME: a11y labels
      <div>
        <ResizeButton
          directions={[DIRECTION_TOP]}
          mouseDownHandler={this.mouseDownHandler}
        />
        <ResizeButton
          directions={[DIRECTION_TOP, DIRECTION_RIGHT]}
          mouseDownHandler={this.mouseDownHandler}
          type="corner"
        />
        <ResizeButton
          directions={[DIRECTION_RIGHT]}
          mouseDownHandler={this.mouseDownHandler}
        />
        <ResizeButton
          directions={[DIRECTION_BOTTOM, DIRECTION_RIGHT]}
          mouseDownHandler={this.mouseDownHandler}
          type="corner"
        />
        <ResizeButton
          directions={[DIRECTION_BOTTOM]}
          mouseDownHandler={this.mouseDownHandler}
        />
        <ResizeButton
          directions={[DIRECTION_BOTTOM, DIRECTION_LEFT]}
          mouseDownHandler={this.mouseDownHandler}
          type="corner"
        />
        <ResizeButton
          directions={[DIRECTION_LEFT]}
          mouseDownHandler={this.mouseDownHandler}
        />
        <ResizeButton
          directions={[DIRECTION_TOP, DIRECTION_LEFT]}
          mouseDownHandler={this.mouseDownHandler}
          type="corner"
        />
      </div>
    );
  }

  private mouseDownHandler = (
    x: number,
    y: number,
    directions: Direction[]
  ) => {
    this.baseX = x;
    this.baseY = y;
    this.currentDirections = [...directions];

    document.addEventListener('mousemove', this.mouseMoveHandler, true);
    document.addEventListener('mouseup', this.mouseUpHandler, true);

    this.props.resizeStart();
  };

  private mouseMoveHandler = (evt: MouseEvent) => {
    const xDiff = evt.pageX - this.baseX;
    const yDiff = evt.pageY - this.baseY;

    this.props.resizeUpdate(xDiff, yDiff, [...this.currentDirections!]);
  };

  private mouseUpHandler = () => {
    document.removeEventListener('mousemove', this.mouseMoveHandler, true);
    document.removeEventListener('mouseup', this.mouseUpHandler, true);

    this.props.resizeEnd();
  };
}

export default Resizers;
