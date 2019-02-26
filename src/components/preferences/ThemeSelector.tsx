import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { changeCurrentTheme } from '../../actions/preferences';
import withUniqueId, { InjectedUniqueIdProps } from '../../hocs/withUniqueId';
import { IAianaState } from '../../reducers/index';
import { CDispatch } from '../../store';

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
    IDispatchProps {}

function ThemeSelector({
  currentTheme,
  selectChangeHandler,
  themes,
  uid
}: IThemeSelector) {
  const [t] = useTranslation();

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
)(withUniqueId(ThemeSelector));
