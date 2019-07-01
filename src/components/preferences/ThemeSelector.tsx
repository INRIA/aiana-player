import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { changeActiveTheme } from '../../actions/preferences';
import withUniqueId, { IInjectedUniqueIdProps } from '../../hocs/withUniqueId';
import { IAianaState } from '../../reducers';
import { CDispatch } from '../../store';

interface IStateProps {
  activeTheme?: string;
  themes?: string[];
}

interface IDispatchProps {
  selectChangeHandler(evt: React.ChangeEvent<HTMLSelectElement>): void;
}

interface IThemeSelector
  extends IInjectedUniqueIdProps,
    IStateProps,
    IDispatchProps {}

function ThemeSelector({
  activeTheme,
  selectChangeHandler,
  themes,
  uid
}: IThemeSelector) {
  const [t] = useTranslation();

  return (
    <Fragment>
      <span id={uid}>{t('preferences.theme_selector.label')}</span>
      <select
        aria-labelledby={uid}
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
)(withUniqueId(ThemeSelector));
