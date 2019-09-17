import React from 'react';
import styled from '../../utils/styled-components';
import { useTranslation } from 'react-i18next';
import GhostButton from './GhostButton';

interface IProps {
  isOn: boolean;
  label?: string;
  labelledBy?: string;
  onClick(evt: React.MouseEvent<any>): void;
}

const StyledToggleButton = styled(GhostButton)`
  width: auto;
  height: auto;
  padding: 0.2em;

  display: flex;

  border: 2px solid ${(props) => props.theme.bg};
  border-radius: 4px;
  background-color: ${(props) => props.theme.fg};
  font-size: 0.75em;
  font-weight: bold;
  outline: 0;
  text-transform: lowercase;

  &[data-focus-visible-added] {
    border-color: ${(props) => props.theme.focus};
    outline: 0;
  }

  span {
    padding: 0.25em 0.5em;
    border-radius: 4px;
    flex: 1;
  }

  .off {
    background: ${(props) => props.theme.bg};
    color: ${(props) => props.theme.fg};
  }

  .on {
    background: transparent;
    color: ${(props) => props.theme.bg};
  }

  &[aria-checked='true'] {
    .off {
      background: transparent;
      color: ${(props) => props.theme.bg};
    }

    .on {
      background: ${(props) => props.theme.bg};
      color: ${(props) => props.theme.fg};
    }
  }
`;

function ToggleButton({ isOn, label, labelledBy, onClick }: IProps) {
  const [t] = useTranslation();

  return (
    <StyledToggleButton
      role="switch"
      aria-label={label}
      aria-labelledby={labelledBy}
      aria-checked={isOn}
      onClick={onClick}
      tabIndex={0}
    >
      <span className="on">{t('button.toggle.on')}</span>
      <span className="off">{t('button.toggle.off')}</span>
    </StyledToggleButton>
  );
}

export default ToggleButton;
