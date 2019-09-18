import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { toggleWidgetVisibility } from '../../../../actions/preferences';
import { CDispatch } from '../../../../store';
import ToggleButton from '../../../shared/ToggleButton';
import useId from '../../../../hooks/useId';

interface IOwnProps {
  visible: boolean;
  widgetName: string;
}

interface IDispatchProps {
  clickHandler(): void;
}

interface IWidgetVisibilityToggle extends IOwnProps, IDispatchProps {}

function WidgetVisibilityToggle(props: IWidgetVisibilityToggle) {
  const [t] = useTranslation();
  const [id] = useId();

  return (
    <Fragment>
      <span id={id}>
        {t('preferences.widgets_visibility.label', {
          widgetName: props.widgetName
        })}
      </span>
      <ToggleButton
        isOn={props.visible}
        labelledBy={id}
        onClick={props.clickHandler}
      />
    </Fragment>
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
)(WidgetVisibilityToggle);
