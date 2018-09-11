import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { changeLanguage } from '../../actions/preferences';
import { IAianaState } from '../../reducers/index';
import { IConnectedReduxProps } from '../../store/index';

interface IProps {
  availableLanguages: string[];
  currentLanguage: string;
}

class LanguageSelector extends React.Component<
  IProps & IConnectedReduxProps & InjectedTranslateProps
> {
  private languageSelect = React.createRef<HTMLSelectElement>();

  public render() {
    const { availableLanguages, currentLanguage, t } = this.props;

    return (
      <div className="aip-language-selector">
        <label>
          <span>{t('preferences.language.label')}</span>
          <select
            ref={this.languageSelect}
            onChange={this.onLanguageChange}
            value={currentLanguage}
          >
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

  private onLanguageChange = () => {
    const languageKey = this.languageSelect.current!.value;

    this.props.dispatch(changeLanguage(languageKey));
  };
}

export default connect((state: IAianaState) => ({
  availableLanguages: state.preferences.availableLanguages,
  currentLanguage: state.preferences.language
}))(translate()(LanguageSelector));
