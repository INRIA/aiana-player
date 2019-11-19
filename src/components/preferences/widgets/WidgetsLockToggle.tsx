import React, { useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { setWidgetsLock } from '../../../actions/preferences';
import { DEFAULT_WIDGETS_LOCK } from '../../../constants/widgets';
import ToggleButton from '../../shared/ToggleButton';
import useId from '../../../hooks/useId';

interface IWidgetsLockToggle {
  setWidgetsLock(locked: boolean): void;
}

function WidgetsLockToggle(props: IWidgetsLockToggle) {
  const [locked, setLocked] = useState(DEFAULT_WIDGETS_LOCK);
  const [t] = useTranslation();
  const [id] = useId();

  return (
    <Fragment>
      <span id={id}>{t('preferences.widgets_editable.label')}</span>
      <ToggleButton
        isOn={!locked}
        labelledBy={id}
        onClick={() => {
          setLocked(!locked);
          props.setWidgetsLock(!locked);
        }}
      />
    </Fragment>
  );
}

const mapDispatch = {
  setWidgetsLock
};

export default connect(
  null,
  mapDispatch
)(WidgetsLockToggle);
