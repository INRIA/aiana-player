import React from 'react';
import {
  DIRECTION_BOTTOM,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_TOP
} from '../../../constants';
import { Direction } from '../../../types';
import styled from '../../../utils/styled-components';
import StyledSvg from '../../styled/StyledSvg';
import ResizeEw from '../../svg/ResizeEw';
import ResizeNesw from '../../svg/ResizeNesw';
import ResizeNs from '../../svg/ResizeNs';
import ResizeNwse from '../../svg/ResizeNwse';
import ResizeButton from './ResizeButton';

interface IProps {
  resizeStart(): void;
  resizeUpdate(xDiff: number, yDiff: number, directions: Direction[]): void;
  resizeEnd(): void;
}

const StyledResizeNs = StyledSvg.withComponent(ResizeNs);
const StyledResizeEw = StyledSvg.withComponent(ResizeEw);
const StyledResizeNesw = StyledSvg.withComponent(ResizeNesw);
const StyledResizeNwse = StyledSvg.withComponent(ResizeNwse);

const StyledResizers = styled.div`
  .focus-visible[data-focus-visible-added] {
    background-color: ${(props) => props.theme.clearFg};

    svg {
      display: block;
      fill: ${(props) => props.theme.bg};
    }
  }
`;

class Resizers extends React.Component<IProps> {
  baseX = 0;
  baseY = 0;
  currentDirections?: Direction[];

  // FIXME: better markup please, and accessibility keys
  render() {
    return (
      // FIXME: a11y labels
      <StyledResizers>
        <ResizeButton
          directions={[DIRECTION_TOP]}
          mouseDownHandler={this.mouseDownHandler}
        >
          <StyledResizeNs />
        </ResizeButton>
        <ResizeButton
          directions={[DIRECTION_TOP, DIRECTION_RIGHT]}
          mouseDownHandler={this.mouseDownHandler}
          type="corner"
        >
          <StyledResizeNesw />
        </ResizeButton>
        <ResizeButton
          directions={[DIRECTION_RIGHT]}
          mouseDownHandler={this.mouseDownHandler}
        >
          <StyledResizeEw />
        </ResizeButton>
        <ResizeButton
          directions={[DIRECTION_BOTTOM, DIRECTION_RIGHT]}
          mouseDownHandler={this.mouseDownHandler}
          type="corner"
        >
          <StyledResizeNwse />
        </ResizeButton>
        <ResizeButton
          directions={[DIRECTION_BOTTOM]}
          mouseDownHandler={this.mouseDownHandler}
        >
          <StyledResizeNs />
        </ResizeButton>
        <ResizeButton
          directions={[DIRECTION_BOTTOM, DIRECTION_LEFT]}
          mouseDownHandler={this.mouseDownHandler}
          type="corner"
        >
          <StyledResizeNesw />
        </ResizeButton>
        <ResizeButton
          directions={[DIRECTION_LEFT]}
          mouseDownHandler={this.mouseDownHandler}
        >
          <StyledResizeEw />
        </ResizeButton>
        <ResizeButton
          directions={[DIRECTION_TOP, DIRECTION_LEFT]}
          mouseDownHandler={this.mouseDownHandler}
          type="corner"
        >
          <StyledResizeNwse />
        </ResizeButton>
      </StyledResizers>
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
