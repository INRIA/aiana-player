import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { changeCurrentTheme } from 'src/actions/preferences';
import { IAianaState } from 'src/reducers/index';
import { CDispatch } from 'src/store';

interface IProps {
  availableThemes: string[];
  currentTheme: string;
}

interface IDispatchProps {
  selectChangeHandler(evt: React.ChangeEvent<HTMLSelectElement>): void;
}

interface IThemeSelector
  extends IProps,
    IDispatchProps,
    InjectedTranslateProps {}

const ThemeSelector: React.SFC<IThemeSelector> = ({
  availableThemes,
  currentTheme,
  selectChangeHandler,
  t
}) => (
  <div className="aip-theme-selector">
    <label>
      <span>{t('preferences.theme-selector.label')}</span>
      <select defaultValue={currentTheme} onChange={selectChangeHandler}>
        {availableThemes.map((themeName) => (
          <option key={themeName}>{themeName}</option>
        ))}
      </select>
    </label>
  </div>
);

const mapStateToProps = (state: IAianaState) => ({
  availableThemes: state.preferences.availableThemes,
  currentTheme: state.preferences.currentTheme
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
