import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { changeActiveTheme } from '../../actions/preferences';
import { IAianaState } from '../../reducers';
import useId from '../../hooks/useId';

interface IStateProps {
  activeTheme?: string;
  themes?: string[];
}

interface IDispatchProps {
  changeActiveTheme(name: string): void;
}

interface IThemeSelector extends IStateProps, IDispatchProps {}

function ThemeSelector(props: IThemeSelector) {
  const [t] = useTranslation();
  const [id] = useId();

  const changeHandler = (evt: React.SyntheticEvent<HTMLSelectElement>) => {
    if (evt.currentTarget.value !== props.activeTheme) {
      props.changeActiveTheme(evt.currentTarget.value);
    }
  };

  return (
    <Fragment>
      <span id={id}>{t('preferences.theme_selector.label')}</span>
      <select
        aria-labelledby={id}
        onBlur={changeHandler}
        onChange={changeHandler}
        value={props.activeTheme}
      >
        {props.themes &&
          props.themes.map((themeName) => (
            <option key={themeName}>{themeName}</option>
          ))}
      </select>
    </Fragment>
  );
}

function mapState(state: IAianaState) {
  return {
    activeTheme: state.preferences.theme,
    themes: state.preferences.themes
  };
}

const mapDispatch = {
  changeActiveTheme
};

export default connect(
  mapState,
  mapDispatch
)(ThemeSelector);
