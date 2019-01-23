import * as React from 'react';
import { ExtendedHTMLElement } from '../../types';
import { unitToPercent } from '../../utils/math';
import styled from '../../utils/styled-components';
import { bounded } from '../../utils/ui';
import StyledButton from '../styled/StyledButton';
import StyledSvg from '../styled/StyledSvg';
import Move from '../svg/Move';

const StyledSvgIcon = StyledSvg.withComponent(Move);

const StyledControlsButton = styled(StyledButton)`
  position: absolute;
  top: 0;
  left: 0;

  display: block;
  height: 36px;
  width: 100%;

  background-color: rgba(200, 100, 100, 0.3);

  &:not([aria-disabled='true']):not([disabled]):not([aria-hidden='true']) {
    cursor: grab;
  }
`;

const StyledDraggable = styled.div`
  position: absolute;
  top: 5%;
  left: 5%;

  width: 35%;
  height: 35%;

  background-color: ${(props) => props.theme.fg};
  /* debug */
  border: 2px solid #333;
`;

export interface IDraggable {
  isDraggable: boolean;
}

interface IWrappedComponentProps {
  boundariesElement?: ExtendedHTMLElement;
  [prop: string]: any;
}

interface IHOCState {
  left: number;
  leftDiff: number;
  leftLowerBound: number;
  leftUpperBound: number;
}

function withDraggable(WrappedComponent: React.ComponentType<any>) {
  return class extends React.Component<IWrappedComponentProps, IHOCState> {
    public controlsRef = React.createRef<HTMLButtonElement>();
    public elementRef = React.createRef<HTMLDivElement>();
    public baseX = 0;

    public state = {
      left: 0,
      leftDiff: 0,
      leftLowerBound: 0,
      leftUpperBound: 100
    };

    public render() {
      return (
        <StyledDraggable
          className="draggable"
          innerRef={this.elementRef}
          style={{
            left: `${bounded(
              this.state.left + this.state.leftDiff,
              0,
              this.state.leftUpperBound
            )}%`
          }}
        >
          <StyledControlsButton
            className="draggable-control"
            innerRef={this.controlsRef}
            onMouseDown={this.dragStartHandler}
          >
            <StyledSvgIcon />
          </StyledControlsButton>

          <WrappedComponent {...this.props} />
        </StyledDraggable>
      );
    }

    private dragStartHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
      evt.preventDefault();

      this.controlsRef.current!.focus();

      this.baseX = evt.pageX;

      this.setLeftUpperBound();

      document.addEventListener('mousemove', this.dragHandler, true);
      document.addEventListener('mouseup', this.dragEndHandler, true);
    };

    private dragHandler = (evt: MouseEvent) => {
      this.updatePosition(evt.pageX);
    };

    private dragEndHandler = () => {
      document.removeEventListener('mousemove', this.dragHandler, true);
      document.removeEventListener('mouseup', this.dragEndHandler, true);

      this.setState({
        left: this.boundedPosition(this.state.left + this.state.leftDiff),
        leftDiff: 0
      });

      this.controlsRef.current!.blur();
    };

    private updatePosition = (mouseX: number) => {
      const { width } = this.props.boundariesElement!.getBoundingClientRect();
      const mouseDiff = mouseX - this.baseX;

      this.setState({
        leftDiff: unitToPercent(mouseDiff, width)
      });
    };

    private setLeftUpperBound() {
      const containerWidth = this.props.boundariesElement!.getBoundingClientRect()
        .width;
      const elementWidth = this.elementRef.current!.getBoundingClientRect()
        .width;

      this.setState({
        leftUpperBound: 100 - (100 * elementWidth) / containerWidth
      });
    }

    private boundedPosition(pct: number) {
      return bounded(pct, this.state.leftLowerBound, this.state.leftUpperBound);
    }
  };
}

export default withDraggable;
