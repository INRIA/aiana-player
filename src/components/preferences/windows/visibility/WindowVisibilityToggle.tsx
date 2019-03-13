import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { setWindowVisibility } from '../../../../actions/preferences';
import withUniqueId, {
  InjectedUniqueIdProps
} from '../../../../hocs/withUniqueId';
import { CDispatch } from '../../../../store';
import ToggleButton from '../../../shared/toggle-button/ToggleButton';

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
    InjectedUniqueIdProps {}

function WindowVisibilityToggle(props: IWindowVisibilityToggle) {
  const [t] = useTranslation();

  return (
    <React.Fragment>
      <span id={props.uid}>{t('preferences.windows_visibility.label')}</span>
      <ToggleButton
        isOn={props.visible}
        labelledBy={props.uid}
        onClick={props.clickHandler}
      />
    </React.Fragment>
  );
}

function mapDispatchToProps(dispatch: CDispatch, ownProps: IOwnProps) {
  return {
    clickHandler() {
      dispatch(setWindowVisibility(ownProps.windowId, !ownProps.visible));
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(withUniqueId(WindowVisibilityToggle));
