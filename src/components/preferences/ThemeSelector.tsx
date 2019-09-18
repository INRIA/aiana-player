import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { changeActiveTheme } from '../../actions/preferences';
import { IAianaState } from '../../reducers';
import { CDispatch } from '../../store';
import useId from '../../hooks/useId';

interface IStateProps {
  activeTheme?: string;
  themes?: string[];
}

interface IDispatchProps {
  selectChangeHandler(evt: React.ChangeEvent<HTMLSelectElement>): void;
}

interface IThemeSelector extends IStateProps, IDispatchProps {}

function ThemeSelector({
  activeTheme,
  selectChangeHandler,
  themes
}: IThemeSelector) {
  const [t] = useTranslation();
  const [id] = useId();

  return (
    <Fragment>
      <span id={id}>{t('preferences.theme_selector.label')}</span>
      <select
        aria-labelledby={id}
        onBlur={selectChangeHandler}
        onChange={selectChangeHandler}
        value={activeTheme}
      >
        {themes &&
          themes.map((themeName) => (
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

function mapDispatch(dispatch: CDispatch) {
  return {
    selectChangeHandler: (evt: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(changeActiveTheme(evt.currentTarget.value));
    }
  };
}

export default connect(
  mapState,
  mapDispatch
)(ThemeSelector);
