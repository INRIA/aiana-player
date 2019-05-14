import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { setWindowsLock } from '../../../actions/preferences';
import { DEFAULT_WINDOWS_LOCK } from '../../../constants';
import withUniqueId, {
  IInjectedUniqueIdProps
} from '../../../hocs/withUniqueId';
import ToggleButton from '../../shared/toggle-button';

interface IDispatchProps {
  setWindowsLock(locked: boolean): any;
}

interface IWindowsLockToggle extends IDispatchProps, IInjectedUniqueIdProps {}

function WindowsLockToggle(props: IWindowsLockToggle) {
  const [locked, setLocked] = useState(DEFAULT_WINDOWS_LOCK);
  const [t] = useTranslation();

  return (
    <React.Fragment>
      <span id={props.uid}>{t('preferences.windows_locked.label')}</span>
      <ToggleButton
        isOn={locked}
        labelledBy={props.uid}
        onClick={() => {
          setLocked(!locked);
          props.setWindowsLock(!locked);
        }}
      />
    </React.Fragment>
  );
}

const mapDispatch = {
  setWindowsLock
};

export default connect(
  null,
  mapDispatch
)(withUniqueId(WindowsLockToggle));
