import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { setWidgetsLock } from '../../../actions/preferences';
import { DEFAULT_WIDGETS_LOCK } from '../../../constants/widgets';
import withUniqueId, {
  IInjectedUniqueIdProps
} from '../../../hocs/withUniqueId';
import ToggleButton from '../../shared/toggle-button';

interface IDispatchProps {
  setWidgetsLock(locked: boolean): any;
}

interface IWidgetsLockToggle extends IDispatchProps, IInjectedUniqueIdProps {}

function WidgetsLockToggle(props: IWidgetsLockToggle) {
  const [locked, setLocked] = useState(DEFAULT_WIDGETS_LOCK);
  const [t] = useTranslation();

  return (
    <React.Fragment>
      <span id={props.uid}>{t('preferences.widgets_locked.label')}</span>
      <ToggleButton
        isOn={locked}
        labelledBy={props.uid}
        onClick={() => {
          setLocked(!locked);
          props.setWidgetsLock(!locked);
        }}
      />
    </React.Fragment>
  );
}

const mapDispatch = {
  setWidgetsLock
};

export default connect(
  null,
  mapDispatch
)(withUniqueId(WidgetsLockToggle));
