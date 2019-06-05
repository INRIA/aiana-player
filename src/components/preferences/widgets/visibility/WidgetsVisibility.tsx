import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { IAianaState } from '../../../../reducers';
import { IWidget } from '../../../../reducers/preferences';
import WidgetVisibilityToggle from './WidgetVisibilityToggle';

interface IStateProps {
  widgets: IWidget[];
}

function WidgetsVisibility(props: IStateProps) {
  const [t] = useTranslation();

  return (
    <div>
      <div>{t('preferences.widgets_visibility.title')}</div>
      <ul>
        {props.widgets.map((widget: IWidget) => (
          <li key={widget.name}>
            <WidgetVisibilityToggle
              widgetName={widget.name}
              visible={widget.visible}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function mapState(state: IAianaState) {
  return {
    widgets: state.preferences.widgets
  };
}

export default connect(mapState)(WidgetsVisibility);
