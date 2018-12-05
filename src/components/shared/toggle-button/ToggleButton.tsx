import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import StyledToggleButton from './Styles';

interface IProps {
  isOn: boolean;
  label?: string;
  labelledBy?: string;
  onClick(evt: React.MouseEvent<any>): void;
}

interface IToggleButton extends IProps, InjectedTranslateProps {}

const ToggleButton: React.SFC<IToggleButton> = ({
  isOn,
  label,
  labelledBy,
  onClick,
  t
}) => (
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

export default translate()(ToggleButton);
