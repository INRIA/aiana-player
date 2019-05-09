import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { IAianaState } from '../../../../reducers';
import { IUIWindows } from '../../../../reducers/preferences';
import WindowVisibilityToggle from './WindowVisibilityToggle';

interface IStateProps {
  windows: IUIWindows;
}

function WindowsVisibility(props: IStateProps) {
  const [t] = useTranslation();

  // FIXME: windows should be an array

  return (
    <div>
      <div>{t('preferences.windows_visibility.title')}</div>
      <ul>
        {Object.keys(props.windows).map((windowId) => (
          <li key={windowId}>
            <WindowVisibilityToggle
              windowId={windowId}
              visible={props.windows[windowId].visible}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function mapState(state: IAianaState) {
  return {
    windows: state.preferences.uiWindows
  };
}

export default connect(mapState)(WindowsVisibility);
