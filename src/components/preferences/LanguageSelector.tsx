import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { changeLanguage } from '../../actions/preferences';
import { IAianaState } from '../../reducers/index';

interface IProps {
  availableLanguages: string[];
  currentLanguage: string;
}

interface IDispatchProps {
  changeLanguage(language: string): AnyAction;
}

interface ILanguageSelector
  extends IProps,
    IDispatchProps,
    InjectedTranslateProps {}

class LanguageSelector extends React.Component<ILanguageSelector> {
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
    this.props.changeLanguage(evt.currentTarget.value);
  };
}

const mapStateToProps = (state: IAianaState) => ({
  availableLanguages: state.preferences.availableLanguages,
  currentLanguage: state.preferences.language
});

const mapDispatchToProps = {
  changeLanguage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate()(LanguageSelector));
