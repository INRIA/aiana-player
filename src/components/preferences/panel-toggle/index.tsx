import React, { ReactNode } from 'react';
import GhostButton from '../../shared/GhostButton';

interface IPanelToggleProps {
  children: ReactNode;
  isExpanded: boolean;
  clickHandler: () => void;
}

function PanelToggle(props: IPanelToggleProps) {
  return (
    <GhostButton
      aria-expanded={props.isExpanded}
      onClick={props.clickHandler}
      type="button"
    >
      {props.children}
    </GhostButton>
  );
}

export default PanelToggle;
