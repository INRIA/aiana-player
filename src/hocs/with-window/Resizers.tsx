import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import StyledSvg from '../../components/shared/styled-svg';
import ResizeEw from '../../components/svg/ResizeEw';
import ResizeNesw from '../../components/svg/ResizeNesw';
import ResizeNs from '../../components/svg/ResizeNs';
import ResizeNwse from '../../components/svg/ResizeNwse';
import {
  DIRECTION_BOTTOM,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_TOP
} from '../../constants';
import { Direction } from '../../types';
import styled from '../../utils/styled-components';
import ResizeButton from './ResizeButton';

interface IProps {
  windowName: string;
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
            windowName: this.props.windowName
          })}
          handlePositions={[DIRECTION_TOP]}
          keyDownHandler={this.props.keyUpdate}
          mouseDownHandler={this.mouseDownHandler}
        >
          <StyledSvg as={ResizeNs} aria-hidden="true" />
        </ResizeButton>
        <ResizeButton
          label={this.props.t('resizers.top_right', {
            windowName: this.props.windowName
          })}
          handlePositions={[DIRECTION_TOP, DIRECTION_RIGHT]}
          keyDownHandler={this.props.keyUpdate}
          mouseDownHandler={this.mouseDownHandler}
          type="corner"
        >
          <StyledSvg as={ResizeNesw} />
        </ResizeButton>
        <ResizeButton
          label={this.props.t('resizers.right', {
            windowName: this.props.windowName
          })}
          handlePositions={[DIRECTION_RIGHT]}
          keyDownHandler={this.props.keyUpdate}
          mouseDownHandler={this.mouseDownHandler}
        >
          <StyledSvg as={ResizeEw} aria-hidden="true" />
        </ResizeButton>
        <ResizeButton
          label={this.props.t('resizers.bottom_right', {
            windowName: this.props.windowName
          })}
          handlePositions={[DIRECTION_BOTTOM, DIRECTION_RIGHT]}
          keyDownHandler={this.props.keyUpdate}
          mouseDownHandler={this.mouseDownHandler}
          type="corner"
        >
          <StyledSvg as={ResizeNwse} />
        </ResizeButton>
        <ResizeButton
          label={this.props.t('resizers.bottom', {
            windowName: this.props.windowName
          })}
          handlePositions={[DIRECTION_BOTTOM]}
          keyDownHandler={this.props.keyUpdate}
          mouseDownHandler={this.mouseDownHandler}
        >
          <StyledSvg as={ResizeNs} aria-hidden="true" />
        </ResizeButton>
        <ResizeButton
          label={this.props.t('resizers.bottom_left', {
            windowName: this.props.windowName
          })}
          handlePositions={[DIRECTION_BOTTOM, DIRECTION_LEFT]}
          keyDownHandler={this.props.keyUpdate}
          mouseDownHandler={this.mouseDownHandler}
          type="corner"
        >
          <StyledSvg as={ResizeNesw} />
        </ResizeButton>
        <ResizeButton
          label={this.props.t('resizers.left', {
            windowName: this.props.windowName
          })}
          handlePositions={[DIRECTION_LEFT]}
          keyDownHandler={this.props.keyUpdate}
          mouseDownHandler={this.mouseDownHandler}
        >
          <StyledSvg as={ResizeEw} aria-hidden="true" />
        </ResizeButton>
        <ResizeButton
          label={this.props.t('resizers.top_left', {
            windowName: this.props.windowName
          })}
          handlePositions={[DIRECTION_TOP, DIRECTION_LEFT]}
          keyDownHandler={this.props.keyUpdate}
          mouseDownHandler={this.mouseDownHandler}
          type="corner"
        >
          <StyledSvg as={ResizeNwse} />
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
