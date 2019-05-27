import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { IAianaState } from '../../../../reducers';
import { IUIWindow } from '../../../../reducers/preferences';
import WindowVisibilityToggle from './WindowVisibilityToggle';

interface IStateProps {
  windows: IUIWindow[];
}

function WindowsVisibility(props: IStateProps) {
  const [t] = useTranslation();

  return (
    <div>
      <div>{t('preferences.windows_visibility.title')}</div>
      <ul>
        {props.windows.map((window: IUIWindow) => (
          <li key={window.name}>
            <WindowVisibilityToggle
              windowName={window.name}
              visible={window.visible}
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
