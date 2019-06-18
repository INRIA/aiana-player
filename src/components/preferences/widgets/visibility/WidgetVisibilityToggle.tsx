import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { setWidgetVisibility } from '../../../../actions/preferences';
import withUniqueId, {
  IInjectedUniqueIdProps
} from '../../../../hocs/withUniqueId';
import { CDispatch } from '../../../../store';
import ToggleButton from '../../../shared/toggle-button';

interface IOwnProps {
  visible: boolean;
  widgetName: string;
}

interface IDispatchProps {
  clickHandler(): void;
}

interface IWidgetVisibilityToggle
  extends IOwnProps,
    IDispatchProps,
    IInjectedUniqueIdProps {}

function WidgetVisibilityToggle(props: IWidgetVisibilityToggle) {
  const [t] = useTranslation();

  return (
    <React.Fragment>
      <span id={props.uid}>
        {t('preferences.widgets_visibility.label', {
          widgetName: props.widgetName
        })}
      </span>
      <ToggleButton
        isOn={props.visible}
        labelledBy={props.uid}
        onClick={props.clickHandler}
      />
    </React.Fragment>
  );
}

function mapDispatch(dispatch: CDispatch, ownProps: IOwnProps) {
  return {
    clickHandler() {
      dispatch(setWidgetVisibility(ownProps.widgetName, !ownProps.visible));
    }
  };
}

export default connect(
  null,
  mapDispatch
)(withUniqueId(WidgetVisibilityToggle));
