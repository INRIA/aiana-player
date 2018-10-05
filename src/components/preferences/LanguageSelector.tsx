import * as React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { changeLanguage } from '../../actions/preferences';
import { IAianaState } from '../../reducers/index';
import { ITransnected } from '../../utils/types';

interface IProps extends ITransnected {
  availableLanguages: string[];
  currentLanguage: string;
}

class LanguageSelector extends React.Component<IProps> {
  public render() {
    const { availableLanguages, currentLanguage, t } = this.props;

    return (
      <div className="aip-language-selector">
        <label>
          <span>{t('preferences.language.label')}</span>
          <select onChange={this.onLanguageChange} value={currentLanguage}>
            {availableLanguages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  }

  private onLanguageChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.dispatch(changeLanguage(evt.currentTarget.value));
  };
}

export default connect((state: IAianaState) => ({
  availableLanguages: state.preferences.availableLanguages,
  currentLanguage: state.preferences.language
}))(translate()(LanguageSelector));
