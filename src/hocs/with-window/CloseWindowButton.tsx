import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { setWindowVisibility } from '../../actions/preferences';
import StyledButton from '../../components/shared/styled-button';
import StyledSvg from '../../components/styled/StyledSvg';
import SvgCross from '../../components/svg/Cross';
import { CDispatch } from '../../store';
import styled from '../../utils/styled-components';

interface IOwnProps {
  activable: boolean;
  windowId: string;
}

interface IDispatchProps {
  clickHandler(): void;
}

interface IProps extends IOwnProps, IDispatchProps {}

const StyledCloseWindowButton = styled(StyledButton)`
  display: block;

  width: 1.5rem;
  height: 1.5rem;

  position: absolute;
  right: 1rem;

  z-index: 1;

  border-radius: 50%;
  background-color: #d3352c;

  svg {
    fill: ${(props) => props.theme.fg};
  }
`;

function CloseWindowButton(props: IProps) {
  const [t] = useTranslation();

  const classes = classNames('aip-window-close', {
    activable: props.activable
  });

  return (
    <StyledCloseWindowButton
      aria-label={t('window.close', {
        windowId: props.windowId
      })}
      className={classes}
      onClick={props.clickHandler}
      type="button"
    >
      <StyledSvg as={SvgCross} />
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
