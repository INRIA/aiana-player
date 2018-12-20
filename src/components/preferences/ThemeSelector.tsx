import * as React from 'react';
import { I18nContextValues, withI18n } from 'react-i18next';
import { connect } from 'react-redux';
import { changeCurrentTheme } from '../../actions/preferences';
import { IAianaState } from '../../reducers/index';
import { CDispatch } from '../../store';
import withUniqueId, { InjectedUniqueIdProps } from '../hocs/withUniqueId';

interface IStateProps {
  currentTheme: string;
  themes: string[];
}

interface IDispatchProps {
  selectChangeHandler(evt: React.ChangeEvent<HTMLSelectElement>): void;
}

interface IThemeSelector
  extends InjectedUniqueIdProps,
    IStateProps,
    IDispatchProps,
    I18nContextValues {}

function ThemeSelector({
  currentTheme,
  selectChangeHandler,
  t,
  themes,
  uid
}: IThemeSelector) {
  return (
    <React.Fragment>
      <span id={uid}>{t('preferences.theme-selector.label')}</span>
      <select
        aria-labelledby={uid}
        onChange={selectChangeHandler}
        value={currentTheme}
      >
        {themes.map((themeName) => (
          <option key={themeName}>{themeName}</option>
        ))}
      </select>
    </React.Fragment>
  );
}

function mapStateToProps(state: IAianaState) {
  return {
    currentTheme: state.preferences.currentTheme,
    themes: state.preferences.themes
  };
}

function mapDispatchToProps(dispatch: CDispatch) {
  return {
    selectChangeHandler: (evt: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(changeCurrentTheme(evt.currentTarget.value));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withI18n()(withUniqueId(ThemeSelector)));
