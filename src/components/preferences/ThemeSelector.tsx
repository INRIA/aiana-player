import * as React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { changeCurrentTheme } from '../../actions/preferences';
import { IAianaState } from '../../reducers/index';
import { ITransnected } from '../../utils/types';

interface IThemeSelector extends ITransnected {
  availableThemes: string[];
  currentTheme: string;
}

class ThemeSelector extends React.Component<IThemeSelector> {
  private selectRef = React.createRef<HTMLSelectElement>();

  public render() {
    const { availableThemes, currentTheme, t } = this.props;
    return (
      <div className="aip-theme-selector">
        <label>
          <span>{t('preferences.theme-selector.label')}</span>
          <select
            ref={this.selectRef}
            defaultValue={currentTheme}
            onChange={this.selectChangeHandler}
          >
            {availableThemes.map((themeName) => (
              <option key={themeName}>{themeName}</option>
            ))}
          </select>
        </label>
      </div>
    );
  }

  private selectChangeHandler = () => {
    const { dispatch } = this.props;

    if (!this.selectRef.current) {
      return;
    }

    const selectedTheme = this.selectRef.current.value;

    dispatch(changeCurrentTheme(selectedTheme));
  };
}

export default connect((state: IAianaState) => ({
  availableThemes: state.preferences.availableThemes,
  currentTheme: state.preferences.currentTheme
}))(translate()(ThemeSelector));
