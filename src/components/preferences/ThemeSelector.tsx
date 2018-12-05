import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { changeCurrentTheme } from 'src/actions/preferences';
import { IAianaState } from 'src/reducers/index';
import { CDispatch } from 'src/store';
import { uuid } from 'src/utils/ui';

interface IStateProps {
  currentTheme: string;
  themes: string[];
}

interface IDispatchProps {
  selectChangeHandler(evt: React.ChangeEvent<HTMLSelectElement>): void;
}

interface IThemeSelector
  extends IStateProps,
    IDispatchProps,
    InjectedTranslateProps {}

const ThemeSelector: React.SFC<IThemeSelector> = ({
  currentTheme,
  selectChangeHandler,
  t,
  themes
}) => {
  const id = uuid();

  return (
    <React.Fragment>
      <span id={id}>{t('preferences.theme-selector.label')}</span>
      <select
        aria-labelledby={id}
        onChange={selectChangeHandler}
        value={currentTheme}
      >
        {themes.map((themeName) => (
          <option key={themeName}>{themeName}</option>
        ))}
      </select>
    </React.Fragment>
  );
};

const mapStateToProps = (state: IAianaState) => ({
  currentTheme: state.preferences.currentTheme,
  themes: state.preferences.themes
});

const mapDispatchToProps = (dispatch: CDispatch) => ({
  selectChangeHandler: (evt: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeCurrentTheme(evt.currentTarget.value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate()(ThemeSelector));
