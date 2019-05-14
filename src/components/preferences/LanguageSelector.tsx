import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { changeCurrentLanguage } from '../../actions/preferences';
import withUniqueId, { IInjectedUniqueIdProps } from '../../hocs/withUniqueId';
import { IAianaState } from '../../reducers';
import { CDispatch } from '../../store';

interface IStateProps {
  UILanguage: string;
  languages: string[];
}

interface IDispatchProps {
  changeHandler(evt: React.ChangeEvent<HTMLSelectElement>): void;
}

interface ILanguageSelector
  extends IInjectedUniqueIdProps,
    IStateProps,
    IDispatchProps {}

function LanguageSelector(props: ILanguageSelector) {
  const [t] = useTranslation();

  return (
    <React.Fragment>
      <span id={props.uid}>{t('preferences.language.label')}</span>
      <select
        aria-labelledby={props.uid}
        onChange={props.changeHandler}
        value={props.UILanguage}
      >
        {props.languages.map((language) => (
          <option key={language} value={language}>
            {t(`languages.${language}`)}
          </option>
        ))}
      </select>
    </React.Fragment>
  );
}

function mapState(state: IAianaState) {
  return {
    UILanguage: state.preferences.language,
    languages: state.preferences.languages
  };
}

function mapDispatch(dispatch: CDispatch) {
  return {
    changeHandler: (evt: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(changeCurrentLanguage(evt.currentTarget.value));
    }
  };
}

export default connect(
  mapState,
  mapDispatch
)(withUniqueId(LanguageSelector));
