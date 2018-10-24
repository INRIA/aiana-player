import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { CDispatch } from 'src/store';
import { changeLanguage } from '../../actions/preferences';
import { IAianaState } from '../../reducers/index';

interface IProps {
  availableLanguages: string[];
  currentLanguage: string;
}

interface IDispatchProps {
  changeHandler: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
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
          <select onChange={this.props.changeHandler} value={currentLanguage}>
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
}

const mapStateToProps = (state: IAianaState) => ({
  availableLanguages: state.preferences.availableLanguages,
  currentLanguage: state.preferences.language
});

const mapDispatchToProps = (dispatch: CDispatch) => ({
  changeHandler: (evt: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeLanguage(evt.currentTarget.value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate()(LanguageSelector));
