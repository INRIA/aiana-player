import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { setWindowVisibility } from '../../../../actions/preferences';
import withUniqueId, {
  IInjectedUniqueIdProps
} from '../../../../hocs/withUniqueId';
import { CDispatch } from '../../../../store';
import ToggleButton from '../../../shared/toggle-button';

interface IOwnProps {
  visible: boolean;
  windowId: string;
}

interface IDispatchProps {
  clickHandler(): void;
}

interface IWindowVisibilityToggle
  extends IOwnProps,
    IDispatchProps,
    IInjectedUniqueIdProps {}

function WindowVisibilityToggle(props: IWindowVisibilityToggle) {
  const [t] = useTranslation();

  return (
    <React.Fragment>
      <span id={props.uid}>
        {t('preferences.windows_visibility.label', {
          windowId: props.windowId
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
      dispatch(setWindowVisibility(ownProps.windowId, !ownProps.visible));
    }
  };
}

export default connect(
  null,
  mapDispatch
)(withUniqueId(WindowVisibilityToggle));
