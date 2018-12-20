import * as React from 'react';
import { I18nContextValues, withI18n } from 'react-i18next';
import { connect } from 'react-redux';
import { changeCurrentLanguage } from '../../actions/preferences';
import { IAianaState } from '../../reducers/index';
import { CDispatch } from '../../store';
import withUniqueId, { InjectedUniqueIdProps } from '../hocs/withUniqueId';

interface IStateProps {
  currentLanguage: string;
  languages: string[];
}

interface IDispatchProps {
  changeHandler(evt: React.ChangeEvent<HTMLSelectElement>): void;
}

interface ILanguageSelector
  extends InjectedUniqueIdProps,
    IStateProps,
    IDispatchProps,
    I18nContextValues {}

class LanguageSelector extends React.Component<ILanguageSelector> {
  public render() {
    const { languages, currentLanguage, t, uid } = this.props;

    return (
      <React.Fragment>
        <span id={uid}>{t('preferences.language.label')}</span>
        <select
          aria-labelledby={uid}
          onChange={this.props.changeHandler}
          value={currentLanguage}
        >
          {languages.map((language) => (
            <option key={language} value={language}>
              {t(`languages.${language}`)}
            </option>
          ))}
        </select>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state: IAianaState) {
  return {
    currentLanguage: state.preferences.currentLanguage,
    languages: state.preferences.languages
  };
}

function mapDispatchToProps(dispatch: CDispatch) {
  return {
    changeHandler: (evt: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(changeCurrentLanguage(evt.currentTarget.value));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withI18n()(withUniqueId(LanguageSelector)));
