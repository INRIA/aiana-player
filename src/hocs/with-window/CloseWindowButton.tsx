import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { setWindowVisibility } from '../../actions/preferences';
import StyledButton from '../../components/styled/StyledButton';
import StyledSvg from '../../components/styled/StyledSvg';
import SvgCross from '../../components/svg/Cross';
import { CDispatch } from '../../store';
import { hexToHsla } from '../../utils/colors';
import styled from '../../utils/styled-components';

interface IOwnProps {
  windowId: string;
}

interface IDispatchProps {
  clickHandler(): void;
}

interface IProps extends IOwnProps, IDispatchProps {}

const CrossIcon = StyledSvg.withComponent(SvgCross);

// FIXME: add styles
const StyledCloseWindowButton = styled(StyledButton)`
  display: block;

  width: 1.5rem;
  height: 1.5rem;

  position: absolute;
  top: 0;
  right: 1rem;
  z-index: 1;

  background-color: #ff4136;
  box-shadow: inset 0 0 1px ${hexToHsla('#000', 0.65)};

  svg {
    fill: white;
  }
`;

function CloseWindowButton(props: IProps) {
  const [t] = useTranslation();

  return (
    <StyledCloseWindowButton
      aria-label={t('window.close', {
        windowId: props.windowId
      })}
      onClick={props.clickHandler}
    >
      <CrossIcon />
    </StyledCloseWindowButton>
  );
}

function mapDispatchToProps(dispatch: CDispatch, ownProps: IOwnProps) {
  return {
    clickHandler() {
      dispatch(setWindowVisibility(ownProps.windowId, false));
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(CloseWindowButton);
