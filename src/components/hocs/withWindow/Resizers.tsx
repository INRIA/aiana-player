import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
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
  windowId: string;
  keyUpdate(key: string, handlePosition: Direction[]): void;
  resizeEnd(): void;
  resizeStart(): void;
  resizeUpdate(
    xDiff: number,
    yDiff: number,
    handlePositions: Direction[]
  ): void;
}

interface IResizers extends IProps, WithTranslation {}

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

class Resizers extends React.Component<IResizers> {
  baseX = 0;
  baseY = 0;
  currentPositions: Direction[] = [];

  // FIXME: better markup please, and accessibility keys
  render() {
    return (
      <StyledResizers>
        <ResizeButton
          label={this.props.t('resizers.top', {
            windowId: this.props.windowId
          })}
          handlePositions={[DIRECTION_TOP]}
          keyDownHandler={this.props.keyUpdate}
          mouseDownHandler={this.mouseDownHandler}
        >
          <StyledResizeNs aria-hidden="true" />
        </ResizeButton>
        <ResizeButton
          label={this.props.t('resizers.top_right', {
            windowId: this.props.windowId
          })}
          handlePositions={[DIRECTION_TOP, DIRECTION_RIGHT]}
          keyDownHandler={this.props.keyUpdate}
          mouseDownHandler={this.mouseDownHandler}
          type="corner"
        >
          <StyledResizeNesw />
        </ResizeButton>
        <ResizeButton
          label={this.props.t('resizers.right', {
            windowId: this.props.windowId
          })}
          handlePositions={[DIRECTION_RIGHT]}
          keyDownHandler={this.props.keyUpdate}
          mouseDownHandler={this.mouseDownHandler}
        >
          <StyledResizeEw aria-hidden="true" />
        </ResizeButton>
        <ResizeButton
          label={this.props.t('resizers.bottom_right', {
            windowId: this.props.windowId
          })}
          handlePositions={[DIRECTION_BOTTOM, DIRECTION_RIGHT]}
          keyDownHandler={this.props.keyUpdate}
          mouseDownHandler={this.mouseDownHandler}
          type="corner"
        >
          <StyledResizeNwse />
        </ResizeButton>
        <ResizeButton
          label={this.props.t('resizers.bottom', {
            windowId: this.props.windowId
          })}
          handlePositions={[DIRECTION_BOTTOM]}
          keyDownHandler={this.props.keyUpdate}
          mouseDownHandler={this.mouseDownHandler}
        >
          <StyledResizeNs aria-hidden="true" />
        </ResizeButton>
        <ResizeButton
          label={this.props.t('resizers.bottom_left', {
            windowId: this.props.windowId
          })}
          handlePositions={[DIRECTION_BOTTOM, DIRECTION_LEFT]}
          keyDownHandler={this.props.keyUpdate}
          mouseDownHandler={this.mouseDownHandler}
          type="corner"
        >
          <StyledResizeNesw />
        </ResizeButton>
        <ResizeButton
          label={this.props.t('resizers.left', {
            windowId: this.props.windowId
          })}
          handlePositions={[DIRECTION_LEFT]}
          keyDownHandler={this.props.keyUpdate}
          mouseDownHandler={this.mouseDownHandler}
        >
          <StyledResizeEw aria-hidden="true" />
        </ResizeButton>
        <ResizeButton
          label={this.props.t('resizers.top_left', {
            windowId: this.props.windowId
          })}
          handlePositions={[DIRECTION_TOP, DIRECTION_LEFT]}
          keyDownHandler={this.props.keyUpdate}
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
    handlePositions: Direction[]
  ) => {
    this.baseX = x;
    this.baseY = y;
    this.currentPositions = [...handlePositions];

    document.addEventListener('mousemove', this.mouseMoveHandler, true);
    document.addEventListener('mouseup', this.mouseUpHandler, true);

    this.props.resizeStart();
  };

  private mouseMoveHandler = (evt: MouseEvent) => {
    const xDiff = evt.pageX - this.baseX;
    const yDiff = evt.pageY - this.baseY;

    this.props.resizeUpdate(xDiff, yDiff, [...this.currentPositions]);
  };

  private mouseUpHandler = () => {
    document.removeEventListener('mousemove', this.mouseMoveHandler, true);
    document.removeEventListener('mouseup', this.mouseUpHandler, true);

    this.props.resizeEnd();
  };
}

export default withTranslation()(Resizers);
