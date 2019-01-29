import * as React from 'react';
import { Direction } from '../../../constants';
import ResizeButton from './ResizeButton';

interface IProps {
  resizeStart(): void;
  resizeUpdate(xDiff: number, yDiff: number, direction: Direction): void;
  resizeEnd(): void;
}

class Resizers extends React.Component<IProps> {
  public baseX = 0;
  public baseY = 0;
  public currentDirection?: Direction;

  public render() {
    return (
      <div>
        <ResizeButton
          direction={Direction.Top}
          mouseDownHandler={this.mouseDownHandler}
        />
        <ResizeButton
          direction={Direction.Right}
          mouseDownHandler={this.mouseDownHandler}
        />
        <ResizeButton
          direction={Direction.Bottom}
          mouseDownHandler={this.mouseDownHandler}
        />
        <ResizeButton
          direction={Direction.Left}
          mouseDownHandler={this.mouseDownHandler}
        />
      </div>
    );
  }

  private mouseDownHandler = (x: number, y: number, direction: Direction) => {
    this.baseX = x;
    this.baseY = y;
    this.currentDirection = direction;

    document.addEventListener('mousemove', this.mouseMoveHandler, true);
    document.addEventListener('mouseup', this.mouseUpHandler, true);

    this.props.resizeStart();
  };

  private mouseMoveHandler = (evt: MouseEvent) => {
    const xDiff = evt.pageX - this.baseX;
    const yDiff = evt.pageY - this.baseY;

    this.props.resizeUpdate(xDiff, yDiff, this.currentDirection!);
  };

  private mouseUpHandler = () => {
    document.removeEventListener('mousemove', this.mouseMoveHandler, true);
    document.removeEventListener('mouseup', this.mouseUpHandler, true);

    this.props.resizeEnd();
  };
}

export default Resizers;
