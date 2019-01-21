import * as React from 'react';
import styled from '../../utils/styled-components';
import StyledButton from '../styled/StyledButton';
import StyledSvg from '../styled/StyledSvg';
import Move from '../svg/Move';

const StyledSvgIcon = StyledSvg.withComponent(Move);

const StyledControls = styled(StyledButton)`
  display: block;
  height: 36px;
  width: 100%;

  background-color: black;

  &:not([aria-disabled='true']):not([disabled]):not([aria-hidden='true']) {
    cursor: grab;
  }
`;

const StyledDraggable = styled.div`
  position: absolute;
  top: 0%;
  right: 40%;
  bottom: 40%;
  left: 0%;

  /* debug */
  border: 2px solid #333;
`;

export interface IDraggable {
  isDraggable: boolean;
}

function withDraggable(WrappedComponent: React.ComponentType<any>) {
  return class extends React.Component<any> {
    public render() {
      return (
        <StyledDraggable className="draggable">
          <StyledControls className="draggable-control">
            <StyledSvgIcon />
          </StyledControls>

          <WrappedComponent {...this.props} />
        </StyledDraggable>
      );
    }
  };
}

export default withDraggable;
