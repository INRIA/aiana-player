import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import StyledToggleButton from './Styles';

interface IProps {
  label?: string;
  labelledBy?: string;
  onClick: (evt: React.MouseEvent<any>) => void;
  pressed: boolean;
}

interface IToggleButton extends IProps, InjectedTranslateProps {}

const ToggleButton: React.SFC<IToggleButton> = ({
  label,
  labelledBy,
  onClick,
  pressed
}) => (
  <StyledToggleButton
    role="switch"
    className={`aip-checkbox ${pressed ? 'pressed' : ''}`}
    aria-label={label}
    aria-labelledby={labelledBy}
    aria-pressed={pressed}
    onClick={onClick}
    tabIndex={0}
  >
    <span className="on">on</span>
    <span className="off">off</span>
  </StyledToggleButton>
);

export default translate()(ToggleButton);
