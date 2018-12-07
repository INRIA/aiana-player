import * as React from 'react';
import { I18nContextValues, withI18n } from 'react-i18next';
import StyledToggleButton from './Styles';

interface IProps {
  isOn: boolean;
  label?: string;
  labelledBy?: string;
  onClick(evt: React.MouseEvent<any>): void;
}

interface IToggleButton extends IProps, I18nContextValues {}

function ToggleButton({ isOn, label, labelledBy, onClick, t }: IToggleButton) {
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

export default withI18n()(ToggleButton);
