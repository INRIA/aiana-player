import React from 'react';
import { useTranslation } from 'react-i18next';
import StyledToggleButton from './Styles';

interface IProps {
  isOn: boolean;
  label?: string;
  labelledBy?: string;
  onClick(evt: React.MouseEvent<any>): void;
}

function ToggleButton({ isOn, label, labelledBy, onClick }: IProps) {
  const [t] = useTranslation();

  return (
    <StyledToggleButton
      role="switch"
      className="aip-switch"
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
