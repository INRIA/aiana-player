import * as React from 'react';
import { I18nContextValues, withI18n } from 'react-i18next';
import { connect } from 'react-redux';
import { changeCurrentLanguage } from '../../actions/preferences';
import { IAianaState } from '../../reducers/index';
import { CDispatch } from '../../store';
import { uuid } from '../../utils/ui';

interface IStateProps {
  currentLanguage: string;
  languages: string[];
}

interface IDispatchProps {
  changeHandler(evt: React.ChangeEvent<HTMLSelectElement>): void;
}

interface ILanguageSelector
  extends IStateProps,
    IDispatchProps,
    I18nContextValues {}

class LanguageSelector extends React.Component<ILanguageSelector> {
  public render() {
    const { languages, currentLanguage, t } = this.props;
    const id = uuid();

    return (
      <React.Fragment>
        <span id={id}>{t('preferences.language.label')}</span>
        <select
          aria-labelledby={id}
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

const mapStateToProps = (state: IAianaState) => ({
  currentLanguage: state.preferences.currentLanguage,
  languages: state.preferences.languages
});

const mapDispatchToProps = (dispatch: CDispatch) => ({
  changeHandler: (evt: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeCurrentLanguage(evt.currentTarget.value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withI18n()(LanguageSelector));
