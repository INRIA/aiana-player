import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { changeLanguage } from 'src/actions/preferences';
import { IAianaState } from 'src/reducers/index';
import { CDispatch } from 'src/store';
import { uuid } from 'src/utils/ui';

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
    const id = uuid();

    return (
      <React.Fragment>
        <span id={id}>{t('preferences.language.label')}</span>
        <select
          aria-labelledby={id}
          onChange={this.props.changeHandler}
          value={currentLanguage}
        >
          {availableLanguages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </React.Fragment>
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
