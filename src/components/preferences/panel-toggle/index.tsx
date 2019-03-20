import React, { ReactNode } from 'react';
import StyledButton from '../../shared/styled-button';

interface IPanelToggleProps {
  children: ReactNode;
  isExpanded: boolean;
  clickHandler: () => void;
}

export function PanelToggle(props: IPanelToggleProps) {
  return (
    <StyledButton
      aria-expanded={props.isExpanded}
      onClick={props.clickHandler}
      type="button"
    >
      {props.children}
    </StyledButton>
  );
}
