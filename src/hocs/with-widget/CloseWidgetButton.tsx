import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { toggleWidgetVisibility } from '../../actions/preferences';
import GhostButton from '../../components/shared/GhostButton';
import StyledSvg from '../../components/shared/SvgIcon';
import SvgCross from '../../components/svg/Cross';
import { CDispatch } from '../../store';
import styled from '../../utils/styled-components';

interface IOwnProps {
  activable: boolean;
  widgetName: string;
}

interface IDispatchProps {
  clickHandler(): void;
}

interface IProps extends IOwnProps, IDispatchProps {}

const StyledCloseWidgetButton = styled(GhostButton)`
  display: block;

  width: 1.5em;
  height: 1.5em;

  position: absolute;
  right: 1em;

  z-index: 1;

  border-radius: 50%;
  background-color: #d3352c;

  svg {
    fill: ${(props) => props.theme.fg};
  }
`;

function CloseWidgetButton(props: IProps) {
  const [t] = useTranslation();

  const classes = classNames('aip-widget-close', {
    activable: props.activable
  });

  return (
    <StyledCloseWidgetButton
      aria-label={t('widget.close', {
        widgetName: props.widgetName
      })}
      className={classes}
      onClick={props.clickHandler}
    >
      <StyledSvg as={SvgCross} />
    </StyledCloseWidgetButton>
  );
}

function mapDispatch(dispatch: CDispatch, ownProps: IOwnProps) {
  return {
    clickHandler() {
      dispatch(toggleWidgetVisibility(ownProps.widgetName));
    }
  };
}

export default connect(
  null,
  mapDispatch
)(CloseWidgetButton);
