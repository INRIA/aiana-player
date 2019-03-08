import React, { Component } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import StyledButton from '../../components/styled/StyledButton';
import StyledSvg from '../../components/styled/StyledSvg';
import SvgCross from '../../components/svg/Cross';
import { hexToHsla } from '../../utils/colors';
import styled from '../../utils/styled-components';

interface IProps extends WithTranslation {
  windowId: string;
}

const CrossIcon = StyledSvg.withComponent(SvgCross);

const StyledCloseWindowButton = styled(StyledButton)`
  display: block;

  width: 1.5rem;
  height: 1.5rem;

  position: absolute;
  top: 0;
  right: 1rem;

  background-color: #ff4136;
  box-shadow: inset 0 0 1px ${hexToHsla('#000', 0.65)};

  svg {
    fill: white;
  }
`;

class CloseWindowButton extends Component<IProps> {
  render() {
    return (
      <StyledCloseWindowButton
        aria-label={this.props.t('window.close', {
          windowId: this.props.windowId
        })}
      >
        <CrossIcon />
      </StyledCloseWindowButton>
    );
  }
}

export default withTranslation()(CloseWindowButton);
